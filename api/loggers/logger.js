const { createLogger, format, transports, config } = require('winston')
const fs = require('fs')

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs')
}

const options = {
  console: {
    level: 'debug',
    format: format.simple(),
    handleExceptions: true,
    colorize: true 
  }
}

const logger = createLogger({
  levels: config.npm.levels,
  format: format.combine(format.timestamp(), format.json()),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({ 
      level: 'error', 
      filename: 'logs/error.log'
    }),
    new transports.File({
      level:	'info',
      filename:	'logs/app.log',
      maxsize:	1048576,
      maxFiles:	10,
      colorize:	false
    })
  ],
  exceptionHandlers: [new transports.File({ filename: 'logs/exceptions.log' })],
  rejectionHandlers: [new transports.File({ filename: 'logs/rejections.log' })],
  exitOnError: false
})

if (process.env.NODE_ENV === 'dev') {
  logger.add(new transports.Console(options.console))
}

module.exports = logger
