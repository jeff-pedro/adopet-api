const BaseError = require('./baseError.js')
const httpStatusCodes = require('./httpStatusCodes')

class Api404Error extends BaseError {
  constructor (
    description,
    name = 'Not found',
    statusCode = httpStatusCodes.NOT_FOUND,
    isOperational = true
  ) { super (name, statusCode, isOperational, description) }
}

module.exports = Api404Error
