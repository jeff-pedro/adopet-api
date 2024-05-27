const BaseError = require('./baseError.js')
const httpStatusCodes = require('./httpStatusCodes')

class InvalidArgumentError extends BaseError {
  constructor (
    description,
    name = 'Invalid Argument Error',
    statusCode = httpStatusCodes.UNPROCESSABLE_ENTITY,
    isOperational = true
  ) { super (name, statusCode, isOperational, description) }
}

module.exports = InvalidArgumentError
