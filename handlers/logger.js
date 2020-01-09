const path = require('path')
const winston = require('winston')
require('winston-daily-rotate-file')
const MESSAGE = Symbol.for('message')
const morgan = require('morgan')
const config = require('../config')

const log_path = path.resolve(path.dirname(require.main.filename), config.get('logger.path'))

winston.exceptions.handle(
  new (winston.transports.DailyRotateFile)({
    filename: path.resolve(log_path, config.get('logger.exceptionLogFileName')),
    datePattern: 'YY-MM-DD.',
    prepend: true,
    colorize: true,
    zippedArchive: false
  })
)
const httpLogger = winston.createLogger({
  transports: [
    new (winston.transports.DailyRotateFile)({
      // level: 'info',
      filename: path.resolve(log_path, config.get('logger.httpLogFileName')),
      datePattern: 'YY-MM-DD.',
      prepend: true,
      colorize: true,
      zippedArchive: false
    })
  ],
  exitOnError: false
})
// appender function to use winston file transport
const stream = {
  write: function (message, encoding) {
    httpLogger.info(message)
  }
}
// morgan is used to capture http log
morgan.format('full', config.get('logger.httpLogFormat'))

const getLabel = function (callingModule) {
  const parts = callingModule.filename.split(path.sep)
  return path.join(parts[parts.length - 2], parts.pop())
}

module.exports = (callingModule) => {
  const jsonFormatter = (logEntry) => {
    const json = `${logEntry.level}  : ${new Date().toISOString()}  : ${getLabel(callingModule)} : ${logEntry.message}`
    logEntry[MESSAGE] = json
    return logEntry
  }
  const transports = [
    new (winston.transports.DailyRotateFile)({
      level: 'info',
      filename: path.resolve(log_path, config.get('logger.logFileName')),
      datePattern: 'YY-MM-DD.',
      prepend: true,
      colorize: true,
      zippedArchive: false
    }),
    new (winston.transports.Console)({
      level: 'debug',
      timestamp: function () {
        return Date.now()
      },
      formatter: function (options) {
        return jsonFormatter
      }
    })
  ]
  const logger = winston.createLogger({
    format: winston.format(jsonFormatter)(),
    transports: transports,
    exitOnError: false
  })
  // wrapper function act as middleware for express
  logger.startHttpLogger = function () {
    return morgan('full', {
      stream: stream
    })
  }
  return logger
}
