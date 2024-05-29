const BaseError = require('./baseError')
const httpStatusCodes = require('./httpStatusCodes')

class ValidationError extends BaseError {
  constructor (
    description,
    name = 'Validation error',
    statusCode = httpStatusCodes.UNPROCESSABLE_ENTITY,
    isOperational = true
  ) { super(name,  statusCode, isOperational, description)}
}

module.exports = ValidationError
