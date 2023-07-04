const SequelizeMock = require('sequelize-mock')
const dbMock = new SequelizeMock()

const AdoptionMock = dbMock.define('pet', {
  animal: 1,
  tutor: 1,
  date: Date.now()
})

module.exports = AdoptionMock
