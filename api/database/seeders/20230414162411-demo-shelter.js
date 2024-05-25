/* eslint-disable no-unused-vars */
'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('shelters', [{
      id: '77c06537-8d57-43fd-8837-24c1d5bbc5a1',       
      name: 'Rúbeo Hagrid Shelter',
      email: 'shelter_hagrid@mail.com',
      phone: '+77666999777',
      city: 'Dufftown',
      state: 'Moray',
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
    {
      id: '719e643c-9f46-42e3-baeb-8008b29ce9ca',
      name: 'Happy Pets Shelter',
      email: 'happyshelter@mail.com',
      phone: '+24777444777',
      city: 'Bergen',
      state: 'Vestland',
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
    {
      id: 'd12d9eb4-40c5-4ab4-8017-88799fd8bd28', 
      name: 'Andry Birds Shelter',
      email: 'angryshelter@mail.com',
      phone: '+44555999555',
      city: 'Bird Island',
      state: 'Pacific Ocean',
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
    {
      id: '13332d46-d3a9-4327-847d-e1c8daf12435',
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
    await queryInterface.bulkDelete('shelters', null, {})
  }
}