const BaseError = require('./baseError.js')
const httpStatusCodes = require('./httpStatusCodes.js')

class InternalServerError extends BaseError {
  constructor (
    description,
    name = 'Internal Server Error',
    statusCode = httpStatusCodes.INTERNAL_SERVER,
    isOperational = true
  ) { super (name, statusCode, isOperational, description) }
}

module.exports = InternalServerError
