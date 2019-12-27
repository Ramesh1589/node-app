
const http = require('http');

// start our app
const app = require('./app');

app.listen(8000, function () {
   console.log('Server Listening On port', 8000)
});

