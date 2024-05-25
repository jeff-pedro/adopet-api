const logger = require('../../loggers/logger.js')

module.exports = {
  'development': {
    'username': process.env.POSTGRES_USER,
    'password': process.env.POSTGRES_PASSWORD,
    'database': process.env.POSTGRES_DB,
    'host': process.env.POSTGRES_HOST,
    'dialect': 'postgres',
    'logging': (sql) => {
      logger.info(`[${new Date()}] ${sql}`)
    }
  },
  'test': {
    'username': process.env.POSTGRES_USER,
    'password': process.env.POSTGRES_PASSWORD,
    'database': 'adopet_tst',
    'host': process.env.POSTGRES_HOST,
    'dialect': 'postgres',
    'logging': false
  },
  'production': {
    'username': process.env.POSTGRES_USER,
    'password': process.env.POSTGRES_PASSWORD,
    'database': process.env.POSTGRES_DB,
    'host': process.env.POSTGRES_HOST,
    'dialect': 'postgres'
  }
}
