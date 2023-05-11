const SequelizeMock = require('sequelize-mock')
const dbMock = new SequelizeMock()

const UserMock = dbMock.define('User', {
  name: 'Jack Sparrow',
  email: 'sparrow@pirates.sea',
  password: 'sparrow123',
  role: 'administrator',
})

UserMock.$queryInterface.$useHandler((query, queryOptions) => {
  if (query === 'findOne') {
    if (queryOptions[0].where.id >= 1) {
      return UserMock.build()
    } else {
      return null
    }
  }

  if (query === 'update') {
    const fields = Object.keys(UserMock._defaults)
    const data = queryOptions[0]

    if(Object.keys(data).length === 0) {
      return 0
    }

    if(Object.keys(data).length > 0) {
      for (let field of fields) {
        if (field in data) {
          return
        }
      }
      return 0
    }
  }
})

afterEach(() => {
  UserMock.$clearResults
})

module.exports = UserMock