const crypto = require('crypto')
const cryptoJS = require('crypto-js')

exports.decryptRequestData = function (encryptedDetails, salt) {
  // Crypto JS Function To Decrypt the Encrypted Data.
  const cryptoDetails = cryptoJS.AES.decrypt(encryptedDetails, salt)
  // To Convert the Encrypted Data in the JSON Format.
  const decrtpyedDetails = JSON.parse(cryptoDetails.toString(cryptoJS.enc.Utf8))
  return decrtpyedDetails
}

/**
 * Encrypts text
 * @param {string} text - text to encrypt
 * @param {string} algorithm - algorithm to decrypt
 * @param {string} secret - secret to decrypt
 */
exports.encrypt = (text, algorithm, secret) => {
  const cipher = crypto.createCipher(algorithm, secret)
  let crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}
/**
 * Decrypts text
 * @param {string} text - text to decrypt
 * @param {string} algorithm - algorithm to decrypt
 * @param {string} secret - secret to decrypt
 */
exports.decrypt = (text, algorithm, secret) => {
  const decipher = crypto.createDecipher(algorithm, secret)
  try {
    let dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8')
    return dec
  } catch (err) {
    return err
  }
}

/**
 * Generates MD5 Hash
 * @param {string} some_string - text to md5 hash
 */
exports.md5hash = some_string => crypto.createHash('md5').update(some_string).digest('hex')
