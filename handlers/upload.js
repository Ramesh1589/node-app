// ****************************************************************************
// This code is designed to allow your ExpressJS app to stream uploads through
// network and on to S3 will full error-handling.
// -----
// You're going to need the following NPM modules installed for this to work:
//  - uuid
//  - busboy
//  - aws-sdk
//  - s3-upload-stream
//  - filesize
// ****************************************************************************
const path = require('path')
const uuid = require('uuid/v4')
const BusBoy = require('busboy')
const AWS = require('aws-sdk')
const S3UploadStream = require('s3-upload-stream')
const FileSize = require('filesize')
const MimeType = require('mime-types')
// ****************************************************************************
// For taking an end-user's Express framework upload stream and piping it though
// clamscan and then on to S3 with full error-handling
// -----
// @param Object  req The Express Request object
// @param Object  res The Express Response object
// @return  Promise I think this can work...
// ****************************************************************************
exports.uploadFiles = function (req, res, opts = {}) {
  const debug_mode = true // Change to `false` if you don't wanna see a bazillion messages in your logs
  AWS.config.update({ accessKeyId: opts.params.accessKeyId, secretAccessKey: opts.params.secretAccessKey, region: opts.params.region })
  const s3 = new AWS.S3({
    params: { Bucket: opts.s3.bucketName }
  })
  const s3_stream = S3UploadStream(s3)
  const EventEmitter = require('events')
  const pipeline = new EventEmitter()
  return new Promise((resolve, reject) => {
    let filesize = 0
    let s3_details = null
    let file_info_list = null
    const fields = {}
    let num_files = 0
    const defaults = {
      s3_path: '', // Needs trailing slash if provided...
      s3_id: null,
      s3_acl: 'private',
      s3_metadata: {},
      max_file_size: 200 * 1024 * 1024, // 200 MB
      max_files: null, // FALSEY === No max number of files
      allowed_mimetypes: [] // FALSEY === Accept anything
    }
    // Merge user option with defaults
    const options = { ...defaults, ...opts }
    // if (!options.s3_id) options.s3_id = `${options.s3_path}${uuid()}`
    // Instantiate BusBoy for this request
    const busboy = new BusBoy({ headers: req.headers, limits: { fileSize: options.max_file_size, files: options.max_files } })
    const log_error = (err) => {
      const code = uuid()
      console.error(`Error Code: ${code}: ${err}`, err)
    }
    // Function to remove file from S3
    const remove_s3_obj = async (s3_id) => {
      try {
        const result = await s3.deleteObject({ Key: s3_id }).promise()
        console.log(`S3 Object: "${s3_id}" was deleted due to an error.`, result)
      } catch (err) {
        log_error(err)
      }
    }
    // When file has been uploaded to S3, this function is called
    const pipeline_complete = async () => {
      if (debug_mode) console.log('Pipeline complete!', { s3_details, file_info_list })
      // If the S3 upload threw an error
      if (s3_details instanceof Error) {
        log_error(s3_details)
        return reject(new Error('There was an issue with your upload (Code: 1). Please try again. If you continue to experience issues, please contact Customer Support!'))
      } else {
      // If the file uploaded just file...
        if (debug_mode) console.log('The file uploaded was just fine... Carrying on...')
      }
      // Resolve upload promise with file info
      if (s3_details && 'Location' in s3_details) s3_details.Location = decodeURIComponent(s3_details.Location) // Not sure why decoding is necessary, but, w/e...
      return resolve({ s3_details, file_info_list, fields })
    }
    // Wait for both the file to be uploaded to S3 and for the scan to complete
    // and then call `pipeline_complete`
    pipeline.on('part-complete', () => {
      // If the full pipeline has completed...
      if (s3_details !== null) pipeline_complete()
    })
    busboy.on('limit', () => {
      const pretty_filesize = FileSize(filesize)
      console.log('File is too big...')
      // TODO: Kill stream??
      return reject(new Error(`The file you've provided (${pretty_filesize}) is over the maximum ${filesize(options.max_file_size)} allowed.`))
    })
    // Capture the non-file fields too...
    busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
      console.log('Reading Body Data..')
      fields[fieldname] = val
      req.body[fieldname] = val
    })
    // Wait for file(s)
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      if (filename) num_files++
      const extname = path.extname(filename).toLowerCase()
      // Make sure we're only allowing the specified type of file(s)
      if (Array.isArray(options.allowed_mimetypes) && options.allowed_mimetypes.length > 0 && !options.allowed_mimetypes.includes(mimetype)) { return reject(new Error('Invalid file type provided!')) }
      const filename_ascii = filename.replace(/[^\x00-\x7F]/g, '').replace(/[,;'"\\\/`|><*:$]/g, '').replace(/^[.-]+(.*)/, '$1')
      // Update file info object
      const file_info = {}
      file_info.filename = filename
      file_info.encoding = encoding
      file_info.mimetype = mimetype
      file_info.filename_ascii = filename_ascii
      // Configure the S3 streaming upload
      const upload = s3_stream.upload({
        Bucket: options.s3.bucketName,
        Key: `${options.s3_path}${uuid()}${extname}`,
        ContentDisposition: `inline; filename="${filename_ascii}"`,
        ContentType: mimetype,
        ACL: options.s3_acl,
        Metadata: options.s3_metadata
      })
      upload.maxPartSize(20 * 1024 * 1024) // 20 MB
      upload.concurrentParts(5)
      upload.on('error', err => {
        s3_details = new Error(err)
        pipeline.emit('part-complete')
      })
      // Do this whenever a chunk of the upload has been received by S3
      upload.on('part', details => {
        if (details.receivedSize > filesize) {
          filesize = details.receivedSize
          file_info.filesize = filesize
        }
        if (debug_mode) console.log('File uploading to S3: ', Math.round((details.uploadedSize / details.receivedSize) * 100) + `% (${details.uploadedSize} / ${details.receivedSize})`)
      })
      // When the file has been fully uploaded to S3
      upload.on('uploaded', details => {
        if (debug_mode) console.log('File Uploaded to S3: ', { details, filesize })
        if (!Array.isArray(s3_details)) s3_details = []
        if (!Array.isArray(file_info_list)) file_info_list = []
        details.fieldname = fieldname
        s3_details.push(details)
        file_info_list.push(file_info)
        if (--num_files === 0) pipeline.emit('part-complete')
      })
      file.pipe(upload)
      if (debug_mode) console.log('Got a file stream!', filename)
    })
    // When busboy has sent the entire upload
    busboy.on('finish', () => {
      if (debug_mode) console.log('BusBoy has fully flushed to S3 Stream...')
      if (num_files === 0) pipeline_complete()
    })
    // Send request to busboy
    req.pipe(busboy)
  })
}
exports.serveFile = function (req, res, next, opts = {}) {
  AWS.config.update({ accessKeyId: opts.params.accessKeyId, secretAccessKey: opts.params.secretAccessKey, region: opts.params.region })
  const s3 = new AWS.S3({
    params: { Bucket: opts.s3.bucketName }
  })
  AWS.Request.prototype.forwardToExpress = function forwardToExpress (res, next, key) {
    this.on('httpHeaders', function (code, headers) {
      res.status(code)
      if (code < 300) {
        const newHeaders = {
          ...headers,
          'Content-Type': MimeType.lookup(opts.key)
        }
        // Remove some unwanted amazon headers
        delete newHeaders['x-amz-id-2']
        delete newHeaders['x-amz-request-id']
        delete newHeaders['x-amz-meta-modified']
        res.set(newHeaders)
      }
    })
      .createReadStream()
      .on('error', next)
      .pipe(res)
  }
  s3.getObject({
    Bucket: opts.s3.bucketName,
    Key: opts.key,
    Range: req.headers.range
  }).forwardToExpress(res, next, opts.key)
}

exports.deleteFile = function (opts = {}, req, res) {
  AWS.config.update({ accessKeyId: opts.params.accessKeyId, secretAccessKey: opts.params.secretAccessKey, region: opts.params.region })
  const s3 = new AWS.S3({
    params: { Bucket: opts.s3.bucketName }
  })
  const params = {
    Bucket: opts.s3.bucketName,
    Key: opts.key,
    key: opts.key1
  }
  return s3.deleteObject(params)
}
