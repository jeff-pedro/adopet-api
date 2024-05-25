/* eslint-disable no-unused-vars */
'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('pets', [{
      id: '7c31941f-7918-4ac5-8d25-1f14dc706625',
      shelter_id: '77c06537-8d57-43fd-8837-24c1d5bbc5a1',
      name: 'Nala',
      birthday: '2023-01-01',
      size: 'Small',
      personality: 'Brava!',
      species: 'Cat',
      status: 'Available',
      profilePictureUrl: '../../public/Felicia.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
    {
      id: 'ffa8fe79-369f-4c41-804a-ab558673e09b',
      shelter_id: '77c06537-8d57-43fd-8837-24c1d5bbc5a1',
      name: 'Pretinha',
      birthday: '2023-01-01',
      size: 'Medium',
      personality: 'Agitada e carinhosa',
      species: 'Dog',
      status: 'Available',
      profilePictureUrl: '../../public/Pretinha.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
    {
      id: '2b880444-79d5-492c-a062-d3f0e622d995',
      shelter_id: '77c06537-8d57-43fd-8837-24c1d5bbc5a1',
      name: 'Felicia',
      birthday: '2023-01-01',
      size: 'Small',
      personality: 'Calma e carinhosa',
      species: 'Cat',
      status: 'Available',
      profilePictureUrl: '../../public/Felicia.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
    {
      id: 'c3147608-c6ff-4ffb-a148-a551426b2236',
      shelter_id: '77c06537-8d57-43fd-8837-24c1d5bbc5a1',
      name: 'Chewbacca',
      birthday: '2023-01-01',
      size: 'Medium',
      personality: 'Agitado e brincalhão',
      species: 'Dog',
      status: 'Available',
      profilePictureUrl: '../../public/Chewbacca.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
    {
      id: '8897e34b-558e-4f1a-a172-fdfc486c9f0d',
      shelter_id: '77c06537-8d57-43fd-8837-24c1d5bbc5a1',
      name: 'Fiona',
      birthday: '2023-01-01',
      size: 'Mini',
      personality: 'Arisca',
      species: 'Dog',
      status: 'Available',
      profilePictureUrl: '../../public/Fiona.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
    {
      id: '6cf393d0-afcb-4b5a-b9e9-ce843b796d38',
      shelter_id: '77c06537-8d57-43fd-8837-24c1d5bbc5a1',
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
      id: 'adc63fe9-19c4-4189-8835-109932fee223',
      shelter_id: '77c06537-8d57-43fd-8837-24c1d5bbc5a1',
      name: 'Dementador',
      birthday: '2023-01-01',
      size: 'Big',
      personality: 'Bravo e malvado',
      species: 'Dog',
      status: 'Available',
      profilePictureUrl: '../../public/Dementador.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
    {
      id: '026d37aa-ffc4-47cb-9317-977aac0f92cf',
      shelter_id: '77c06537-8d57-43fd-8837-24c1d5bbc5a1',
      name: 'Penelope',
      birthday: '2023-01-01',
      size: 'Small',
      personality: 'Arisca e tímida',
      species: 'Dog',
      status: 'Available',
      profilePictureUrl: '../../public/Penelope.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
    {
      id: '626a685f-ea4e-4394-aba8-91efb93542f6',
      shelter_id: '77c06537-8d57-43fd-8837-24c1d5bbc5a1',
      name: 'Lampeão',
      birthday: '2023-01-01',
      size: 'Small',
      personality: 'Perigoso e dançarino',
      species: 'Cat',
      status: 'Available',
      profilePictureUrl: '../../public/Lampeao.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
    {
      id: 'b8563ccd-25a1-41e3-8033-840d6a431f0e',
      shelter_id: '77c06537-8d57-43fd-8837-24c1d5bbc5a1',
      name: 'Kitty',
      birthday: '2023-01-01',
      size: 'Mini',
      personality: 'Amorosa e esfomeada',
      species: 'Cat',
      status: 'Available',
      profilePictureUrl: '../../public/Kitty.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
    {
      id: '10fe91f6-1067-49d7-821e-99e1c9838967',
      shelter_id: '77c06537-8d57-43fd-8837-24c1d5bbc5a1',
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
    await queryInterface.bulkDelete('pets', null, {})
  }
}