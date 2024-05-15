const SequelizeMock = require('sequelize-mock')
const dbMock = new SequelizeMock()

const PetMock = dbMock.define('pet', {
  name: 'Cotton',
  birthday: '2023-01-01',
  size: 'Mini',
  personality: 'Calmo e carinhoso',
  species: 'Dog',
  status: 'Available',
  shelter_id: 1,
  profilePictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQktXg5_v8-L9AslphhrFvphE12SWkGl-_Jig&usqp=CAU',
})

PetMock.findByPk = async (id, options) => {
  return PetMock.findOne({
    where: {
      id,
    },
    ...options,
  })
}

PetMock.$queryInterface.$useHandler((query, queryOptions) => {
  if (query === 'findOne') {
    if (queryOptions[0].where.id >= 1) {
      return PetMock.build()
    } else {
      return null
    }
  }

  if (query === 'update') {
    const fields = Object.keys(PetMock._defaults)
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
  PetMock.$clearResults
})

module.exports = PetMock
