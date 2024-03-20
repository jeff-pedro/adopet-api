'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Pets', [{
      shelter_id: 1,
      name: 'Nala',
      birthday: '2023-01-01',
      size: 'Small',
      personality: 'Brava!',
      species: 'Cat',
      status: 'Available',
      profilePictureUrl: '../../public/Felicia.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      shelter_id: 1,
      name: 'Pretinha',
      birthday: '2023-01-01',
      size: 'Medium',
      personality: 'Agitada e carinhosa',
      species: 'Dog',
      status: 'Available',
      profilePictureUrl: '../../public/Pretinha.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      shelter_id: 1,
      name: 'Felicia',
      birthday: '2023-01-01',
      size: 'Small',
      personality: 'Calma e carinhosa',
      species: 'Cat',
      status: 'Available',
      profilePictureUrl: '../../public/Felicia.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      shelter_id: 1,
      name: 'Chewbacca',
      birthday: '2023-01-01',
      size: 'Medium',
      personality: 'Agitado e brincalhão',
      species: 'Dog',
      status: 'Available',
      profilePictureUrl: '../../public/Chewbacca.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      shelter_id: 1,
      name: 'Fiona',
      birthday: '2023-01-01',
      size: 'Mini',
      personality: 'Arisca',
      species: 'Dog',
      status: 'Available',
      profilePictureUrl: '../../public/Fiona.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      shelter_id: 1,
      name: 'Yoda',
      birthday: '2023-01-01',
      size: 'Medium',
      personality: 'Rabugento e preguiçoso',
      species: 'Cat',
      status: 'Available',
      profilePictureUrl: '../../public/Yoda.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      shelter_id: 1,
      name: 'Dementador',
      birthday: '2023-01-01',
      size: 'Big',
      personality: 'Bravo e malvado',
      species: 'Dog',
      status: 'Available',
      profilePictureUrl: '../../public/Dementador.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      shelter_id: 1,
      name: 'Penelope',
      birthday: '2023-01-01',
      size: 'Small',
      personality: 'Arisca e tímida',
      species: 'Dog',
      status: 'Available',
      profilePictureUrl: '../../public/Penelope.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      shelter_id: 1,
      name: 'Lampeão',
      birthday: '2023-01-01',
      size: 'Small',
      personality: 'Perigoso e dançarino',
      species: 'Cat',
      status: 'Available',
      profilePictureUrl: '../../public/Lampeao.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      shelter_id: 1,
      name: 'Kitty',
      birthday: '2023-01-01',
      size: 'Mini',
      personality: 'Amorosa e esfomeada',
      species: 'Cat',
      status: 'Available',
      profilePictureUrl: '../../public/Kitty.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      shelter_id: 1,
      name: 'Zelda',
      birthday: '2023-01-01',
      size: 'Mini',
      personality: 'Desconfiado, agitado e carinhoso',
      species: 'Dog',
      status: 'Available',
      profilePictureUrl: '../../public/Zelda.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pets', null, {})
  }
}