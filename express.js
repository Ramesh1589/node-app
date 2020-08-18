const util = require('util')
const path = require('path')
const compression = require('compression')
const helmet = require('helmet')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const i18n = require('i18n')
var ejs = require('ejs');
// logger
const logger = require('./handlers/logger')(module)

const app = express()

app.use(logger.startHttpLogger())
// initialize passport
// require('./handlers/passport').init(app)
// Enable compression
app.use(compression())
// Prevent opening page in frame or iframe to protect from clickjacking
app.use(helmet.frameguard())
// Remove X-Powered-By
app.use(helmet.hidePoweredBy())
// Prevent47425c77-e744-4dd6-b8d4-a4e91bf03b6as browser from caching and storing page
app.use(helmet.noCache())
// Allow loading resources only from white-listed domains
// app.use(helmet.csp())
// Allow communication only on HTTPS
// app.use(helmet.hsts())
// Enable XSS filter in IE (On by default)
app.use(helmet.xssFilter())
// Forces browser to only use the Content-Type set in the response header
// instead of sniffing or guessing it
// app.use(helmet.contentTypeOptions())
const errorHandlers = require('./handlers/errors')
const { getIP } = require('./helpers')
// enable cors for all origins!
app.use(cors())

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

const swaggerDocument1 = require('./swagger/swagger1.json');

// const routes = require('./routes/index');
app.set('view engine', 'ejs');
var options = {
    explorer: false
};


// enable cors for all origins!!!
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
// i18n
i18n.configure({
    locales: ['en', 'ar'],
    directory: `${__dirname}/locales`,
    defaultLocale: 'en',
    objectNotation: true,
    cookie: 'lang'
})
app.use(i18n.init)

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument, options));


// app.use('/api-docs1', swaggerUi.serve)
// app.get('/api-docs1', swaggerUi.setup(swaggerDocument1, options));

// Set Static Foldr
app.use(express.static(path.join(__dirname, './dist')));


app.use('/', express.static(path.join(__dirname, './dist')));
app.get('/', (req, res)=> {
    res.sendFile(__dirname + './dist/index.html');
});
app.use(function (req, res, next) {
    app.set(i18n.setLocale(req.headers.lang || 'en'))
    next();
})
// routes(app);
// after all that above middleware, we finally handle our own routes!
require('./components')(app)

// done! we export it so we can start the site in start.js
module.exports = app;

