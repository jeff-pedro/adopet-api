'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Shelters', [{
      name: 'Shelter Rúbeo Hagrid',
      email: 'shelter_hagrid@mail.com',
      phone: '+77666999777',
      city: 'Dufftown',
      state: 'Moray',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Shelters', null, {});
  }
}