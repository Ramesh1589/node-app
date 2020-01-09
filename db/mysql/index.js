const path = require('path')
const fs = require('fs')
const util = require('util')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const config = require('./../../config')
const logger = require('./../../handlers/logger')(module)

const db = {}
const sequelize = new Sequelize(config.get('db.mysql.database'), config.get('db.mysql.username'), config.get('db.mysql.password'), {
  isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
  retry: {
    match: [
      'ER_LOCK_DEADLOCK: Deadlock found when trying to get lock; try restarting transaction',
      /ER_LOCK_DEADLOCK/,
      /SequelizeConnectionError/,
      /SequelizeConnectionRefusedError/,
      /SequelizeHostNotFoundError/,
      /SequelizeHostNotReachableError/,
      /SequelizeInvalidConnectionError/,
      /SequelizeConnectionTimedOutError/,
      /TimeoutError/,
      Sequelize.ConnectionError
    ],
    // name: 'query',
    // backoffBase: 1000, // Initial backoff duration in ms. Default: 100,
    // backoffExponent: 1.5, // Exponent to increase backoff each try. Default: 1.1
    timeout: 30000, // throw if no response or error within millisecond timeout, default: undefined,
    max: 10 // maximum amount of tries
  },
  ...config.get('db.mysql')
})

// Read all the table schema files from the schema directory and exclude index.js from that directory
fs.readdirSync(path.join(__dirname, 'schema'))
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(function (file) {
    const model = sequelize.import(path.join(__dirname, 'schema/' + file))
    db[model.name] = model
  })

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

// verify the connection
sequelize.authenticate().then(async () => {
  logger.info('MySQL Connection has been established successfully.')
  await sequelize.sync({ force: false })
}).catch((error) => {
  logger.error(util.format('Error While Connecting To the MySQL Database. Error: %j', error))
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
