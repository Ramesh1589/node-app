/**
 * Builds error object
 * @param {number} status - error status code
 * @param {string} message - error text
 */
exports.buildErrObject = (code, message) => {
  return {
    code,
    message
  }
}
/**
 * Handles error by printing to console in development env and builds and sends an error response
 * @param {Object} res - response object
 * @param {Object} err - error object
 */
exports.handleError = (res, err) => {
  // Prints error in console
  console.error('Generic Error:', err)
  // Sends error to user
  res.status(200).json({ // 500 changed to 200 for frontend loader issue
    success: false,
    code: err.code,
    message: err.message
  })
}
/*
  Catch Errors Handler

  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in
  catchErrors(), catch and errors they throw, and pass it along to our express middleware with next()
*/
exports.catchErrors = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next)
  }
}
/*
  Not Found Error Handler

  If we hit a route that is not found, we mark it as 404 and pass it along to the next error handler to display
*/
exports.notFound = (req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
  // res.status(404).end()
}
/*
  Validation Error Handler
*/
exports.validationErrors = (err, req, res, next) => {
  if (!err.errors) return next(err)
  // validation errors look like
  const errorKeys = Object.keys(err.errors)
  const errorMsgs = []
  errorKeys.forEach(key => errorMsgs.push(err.errors[key].message ? err.errors[key].message : err.errors[key].msg))
  const data = {
    success: false,
    code: 400,
    message: errorMsgs
  }
  res
    .status(200)
    .send(data)
}
/*
  Development Error Hanlder

  In development we show good error messages so if we hit a syntax error or any other previously un-handled error, we can show good info on what happened
*/
exports.developmentErrors = (err, req, res, next) => {
  console.error('developmentErrors:', err)
  err.stack = err.stack || ''
  const errorDetails = {
    code: err.status || 500,
    message: err.message,
    stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
  }
  res.status(500)
  res.format({
    // Based on the `Accept` http header
    // 'text/html': () => {
    //  res.render('error', errorDetails)
    // }, // Form Submit, Reload the page
    'application/json': () => res.json(errorDetails) // Ajax call, send JSON back
  })
}
/*
  Production Error Hanlder

  No stacktraces are leaked to user
*/
exports.productionErrors = (err, req, res, next) => {
  res.status(500)
  res.send({
    code: err.status || 500,
    message: err.message || 'Internal server error'
  })
}
