// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' })
// const http = require('http');
const util = require('util')
const logger = require('./handlers/logger')(module)
// mysql connection
// require('./db/mysql')
//mongodb connection
// require('./db/mongo').connect()

// start our app
const app = require('./express');
// setting the port
app.set('port', process.env.PORT || 3000)
const http = require("http").createServer(app);
const io = require("socket.io")(http);
require('./socket/socket')(io);
require('./socket/admin')(io);
require('./socket/chat')(io);

const admin = io.of('/admin');

http.listen(app.get('port'))
http.on('error', onError)
http.on('listening', onListening)

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
   const addr = http.address()
   const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
   console.log('Server Listening on ' + bind)
 }
 