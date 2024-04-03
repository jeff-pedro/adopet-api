module.exports = {
  'development': {
    'username': process.env.MYSQL_USER,
    'password': process.env.MYSQL_PASSWORD,
    'database': process.env.MYSQL_DB,
    'host': process.env.MYSQL_HOST,
    'dialect': 'mysql'
  },
  'test': {
    'username': 'root',
    'password': null,
    'database': 'adopet_tst',
    'host': 'db',
    'dialect': 'mysql',
    'logging': false
  },
  'production': {
    'username': 'root',
    'password': null,
    'database': 'database_prd',
    'host': '127.0.0.1',
    'dialect': 'mysql'
  }
}