const { validationResult } = require('express-validator')
/*
  Express Validation Handler
*/
exports.validationResult = (req, res, next) => {
  try {
    validationResult(req).throw() // Finds the validation errors in this request and wraps them in an object with handy functions
    if (req.body.email) {
      req.body.email = req.body.email.toLowerCase()
    }
    return next()
  } catch (error) {
    return next(error)
  }
}
