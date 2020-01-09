/*
  connect to mognodb database and handle any bad connections
*/
const util = require('util')
const mongoose = require('mongoose')
const fs = require('fs')
const modelsPath = `${__dirname}/schema/`
const logger = require('./../../handlers/logger')(module)
const config = require('./../../config')
const { removeExtensionFromFile } = require('../../helpers')
// mongoose.set('debug', true);
// use createIndexes instead of ensureIndex
mongoose.set('useCreateIndex', true)
// tell mongoose to use ES6 promises
mongoose.Promise = global.Promise
// exploit the configuration file
const database = config.get('db.mongodb.database')
const username = config.get('db.mongodb.user')
const password = config.get('db.mongodb.password') ? encodeURIComponent(config.get('db.mongodb.password')) : undefined
const port = config.get('db.mongodb.port')
const host = config.get('db.mongodb.server')
const url = password ? `mongodb://${username}:${password}@${host}:${port}/${database}` : `mongodb://${host}:${port}/${database}`
const mongodb_options = config.get('db.mongodb.options')
// mongo connection events
mongoose.connection.on('connected', () => {
  logger.info('MongoDB Connection Established')
})
mongoose.connection.on('reconnected', () => {
  logger.info('MongoDB Connection Re-established')
})
mongoose.connection.on('disconnected', () => {
  logger.info('MongoDB Connection Disconnected')
})
mongoose.connection.on('close', () => {
  logger.info('MongoDB Connection Closed')
})
mongoose.connection.on('error', (error) => {
  logger.error('MongoDB ERROR: ' + error)
  setTimeout(exports.connect, 1000)
})

exports.connect = async () => {
  try {
    await mongoose.connect(url, mongodb_options)
    loadModels()
  } catch (error) {
    logger.error(util.format('MongoDB Connection Error: ', error))
  }
}

const loadModels = () => {
  /*
   * Load models dynamically
   */
  // Loop models path and loads every file as a model except index.js
  fs.readdirSync(modelsPath).filter(file => {
    // Take filename and remove last part (extension)
    const modelFile = removeExtensionFromFile(file)
    // Prevents loading of this file
    return modelFile !== 'index' ? require(`./schema/${modelFile}`) : ''
  })
}
