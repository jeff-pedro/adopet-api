'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Pets', [{
      shelter_id: 1,
      name: 'Doguinho',
      birthday: '2023-01-01',
      size: 'Mini',
      personality: 'Calmo e carinhoso',
      species: 'Dog',
      status: 'Available',
      profilePictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQktXg5_v8-L9AslphhrFvphE12SWkGl-_Jig&usqp=CAU',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pets', null, {})
  }
}