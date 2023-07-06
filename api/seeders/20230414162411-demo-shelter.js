'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Shelters', [{
      name: 'Rúbeo Hagrid Shelter',
      email: 'shelter_hagrid@mail.com',
      phone: '+77666999777',
      city: 'Dufftown',
      state: 'Moray',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Happy Pets Shelter',
      email: 'happyshelter@mail.com',
      phone: '+24777444777',
      city: 'Bergen',
      state: 'Vestland',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Andry Birds Shelter',
      email: 'angryshelter@mail.com',
      phone: '+44555999555',
      city: 'Bird Island',
      state: 'Pacific Ocean',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Gotham City Shelter for Cats and Dogs',
      email: 'gothamshelter@mail.com',
      phone: '+1999111999',
      city: 'Gotham',
      state: 'New York',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Shelters', null, {})
  }
}