const BaseError = require('../errors/baseError')

function logError(err) {
  console.error(err)
}

function logErrorMiddleware(err, req, res, next) {
  logError(err)
  next(err)
}

function returnError(err, req, res, next) {
  return res.status(err.statusCode || 500).json({ error: err.message })
}

function isOperational(err) {
  if (err instanceof BaseError) {
    return err.isOperational
  }
  return false
}

module.exports = {
  logError,
  returnError,
  logErrorMiddleware,
  isOperational
}
