const BaseError = require('./baseError')
const httpStatusCodes = require('./httpStatusCodes')

class ValidationError extends BaseError {
  constructor (
    description,
    name = 'Validation error',
    statusCode = httpStatusCodes.BAD_REQUEST,
    isOperational = true
  ) { super(name,  statusCode, isOperational, description)}
}

module.exports = ValidationError
