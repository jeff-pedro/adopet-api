const morgan = require('morgan')
const json = require('morgan-json')
const logger = require('./logger.js')


const format = json({
  method: ':method',
  url: ':url',
  status: ':status',
  contentLength: ':res[content-length]',
  responseTime: ':response-time'
})


const httpLogger = morgan(format, {
  stream: {
    write: (message) => {
      const {
        method,
        url,
        status,
        contentLength,
        responseTime
      } = JSON.parse(message)

      logger.info('HTTP Access Log', {
        timestamp: new Date().toString(),
        method,
        url,
        status: Number(status),
        contentLength,
        responseTime: Number(responseTime)
      })
    }
  }
})

// log only 4xx and 5xx responses to console
const httpErrorLogger = morgan('dev', {
  skip: (req, res) => res.statusCode < 400
})

module.exports = {
  httpLogger,
  httpErrorLogger
}
