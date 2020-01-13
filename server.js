
// const http = require('http');
const util = require('util')
const logger = require('./handlers/logger')(module)
// mysql connection
// require('./db/mysql')
//mongodb connection
require('./db/mongo').connect()

// start our app
const app = require('./app');
const server = require("http").createServer(app);
const io = require("socket.io")(server);
require('./socket/socket')(io);
app.listen(8000, function () {
   console.log('Server Listening On port', 8000)
});

