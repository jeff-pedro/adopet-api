const BaseError = require('./baseError')
const httpStatusCodes = require('./httpStatusCodes')

class UnprocessableEntityError extends BaseError {
  constructor (
    description,
    name = 'Unprocessable Entity',
    statusCode = httpStatusCodes.UNPROCESSABLE_ENTITY,
    isOperational = true
  ) { super(name,  statusCode, isOperational, description)}
}

module.exports = UnprocessableEntityError
