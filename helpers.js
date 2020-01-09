const path = require('path')
const fs = require('fs')
const REQIP = require('request-ip')
// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = (obj) => JSON.stringify(obj, null, 2)
// Use this function to gather required fields only from the req object
exports.adaptRequest = (req = {}) => {
  return Object.freeze({
    path: req.path,
    method: req.method,
    pathParams: req.params,
    queryParams: req.query,
    body: req.body
  })
}
/**
 * Removes extension from file
 * @param {string} file - filename
 */
exports.removeExtensionFromFile = file => {
  return file
    .split('.')
    .slice(0, -1)
    .join('.')
    .toString()
}
/**
 * Gets browser info from user
 * @param {*} req - request object
 */
exports.getBrowserInfo = req => req.headers['user-agent']
/**
 * Gets country from user using CloudFlare header 'cf-ipcountry'
 * @param {*} req - request object
 */
exports.getCountry = req => req.headers['cf-ipcountry'] ? req.headers['cf-ipcountry'] : 'XX'
/**
 * Gets IP from user
 * @param {*} req - request object
 */
exports.getIP = req => REQIP.getClientIp(req)
/**
 * Checks if given ID is good for MongoDB
 * @param {string} id - id to check
 */
exports.isMongoIDGood = async id => {
  return new Promise((resolve, reject) => {
    const goodID = String(id).match(/^[0-9a-fA-F]{24}$/)
    return goodID
      ? resolve(id)
      : reject(this.buildErrObject(422, 'ID_MALFORMED'))
  })
}
/**
 * Adds minutes to current time
 * @param {number} minutes - minutes to add
 */
exports.nowPlusMinutes = (minutes) => Math.floor(Date.now() / 1000) + 60 * minutes

exports.copyFileSync = (source, target) => {
  let targetFile = target
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source))
    }
  }
  fs.writeFileSync(targetFile, fs.readFileSync(source))
}

exports.copyFolderRecursiveSync = (source, target) => {
  let files = []
  const targetFolder = path.join(target, path.basename(source))
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder)
  }

  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source)
    files.forEach(file => {
      const curSource = path.join(source, file)
      if (fs.lstatSync(curSource).isDirectory()) {
        module.exports.copyFolderRecursiveSync(curSource, targetFolder)
      } else {
        module.exports.copyFileSync(curSource, targetFolder)
      }
    })
  }
}

exports.walkdirSync = (dir) => {
  let results = []
  const list = fs.readdirSync(dir)
  list.forEach(function (file) {
    file = path.join(dir, file)
    const stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      results = results.concat(module.exports.walkdirSync(file))
    } else {
      results.push(file)
    }
  })
  return results
}
