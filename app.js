const express =  require('express')
  const bodyParser = require('body-parser');
  const cors = require('cors');

  const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger1.json');

const routes = require('./routes/index');


const app = express()

var options = {
    explorer: false
  };


// enable cors for all origins!
app.use(cors());

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
// takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json({ type: 'application/json', limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.text());

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument, options));

routes(app);

// done! we export it so we can start the site in start.js
module.exports = app;

