const BaseError = require('./baseError.js')
const httpStatusCodes = require('./httpStatusCodes.js')

class UnauthorizedError extends BaseError {
  constructor (
    description,
    name = 'Unauthorized',
    statusCode = httpStatusCodes.UNAUTHORIZED,
    isOperational = true
  ) { super (name, statusCode, isOperational, description) }
}

module.exports = UnauthorizedError
