module.exports = function (app) {
    app.use('/api/auth', require('./auth'))
    app.use('/api/employee', require('./employee')) 
    app.use('/api/user', require('./user')) 
}
  