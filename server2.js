// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' })
const util = require('util')
const logger = require('./handlers/logger')(module)
// mysql connection
require('./db/mysql')
// mongodb connection
// require('./db/mongo').connect()
// require libraries to use
const http = require('http')
const app = require('./app')
// setting the port
app.set('port', process.env.PORT || 7777)
// create server
const server = http.createServer(app)
server.listen(app.get('port'))
server.on('error', onError)
server.on('listening', onListening)
/*
  Event listener for http server "error" event
*/
function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }
  const bind = typeof port === 'string' ? 'Pipe ' + app.get('port') : 'Port ' + app.get('port')
  // handle specific listen errors
  switch (error.code) {
    case 'EACCES':
      logger.error(util.format(bind, 'requires elevated privileges'))
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      logger.error(util.format(bind, ' is already in use'))
      console.error(bind + ' is already in use')
      process.exit(1)
    default:
      logger.error(util.format('http server: ', error))
      throw error
  }
}
/*
  Event listener for http server "listening" event
*/
function onListening () {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  console.log('Server Listening on ' + bind)
}
