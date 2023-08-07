const SequelizeMock = require('sequelize-mock')
const dbMock = new SequelizeMock()

const ShelterMock = dbMock.define('Shelter', {
  name: 'Caribbean Crazy Animals',
  email: 'contact@crazyanimals.sea',
  phone: '+08898985421',
  city: 'Port Royal',
  state: 'Caribbean'
})

ShelterMock.$queryInterface.$useHandler((query, queryOptions) => {
  if (query === 'findOne') {
    if (queryOptions[0].where.id >= 1) {
      return ShelterMock.build()
    } else {
      return null
    }
  }
})

ShelterMock.findByPk = async (id) => ShelterMock.findById(id)
ShelterMock.$queryInterface.$useHandler((query, queryOptions, done) => {
  if (query === 'findById') {
    if (queryOptions[0] < 1) {
      return null
    }
    return
  }
})

ShelterMock.$queryInterface.$useHandler((query, queryOptions, done) => {
  if (query === 'update') {
    const fields = Object.keys(ShelterMock._defaults)
    const data = queryOptions[0]

    if (Object.keys(data).length === 0) {
      return 0
    }

    if (Object.keys(data).length > 0) {
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
  ShelterMock.$clearResults
})

module.exports = ShelterMock