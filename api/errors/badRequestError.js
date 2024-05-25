const BaseError = require('./baseError')
const httpStatusCodes = require('./httpStatusCodes')

class BadRequestError extends BaseError {
  constructor (
    description,
    name = 'Bad request',
    statusCode = httpStatusCodes.BAD_REQUEST,
    isOperational = true
  ) { super(name,  statusCode, isOperational, description)}
}

module.exports = BadRequestError
