
// const http = require('http');
const util = require('util')
const logger = require('./handlers/logger')(module)
// mysql connection
// require('./db/mysql')
//mongodb connection
// require('./db/mongo').connect()

// start our app
const app = require('./app');
const http = require("http").createServer(app);
const io = require("socket.io")(http);
require('./socket/socket')(io);
require('./socket/admin')(io);
require('./socket/chat')(io);

const admin = io.of('/admin');

console.log('Added Console in Server File....')

http.listen(8000, function () {
   console.log('Server Listening On port', 8000)
});

