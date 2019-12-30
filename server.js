
// const http = require('http');

// start our app
const app = require('./app');
const server = require("http").createServer(app);
const io = require("socket.io")(server);
require('./socket/socket')(io);
app.listen(8000, function () {
   console.log('Server Listening On port', 8000)
});

