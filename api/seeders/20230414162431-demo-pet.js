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
      profilePictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQktXg5_v8-L9AslphhrFvphE12SWkGl-_Jig&usqp=CAU',
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
      profilePictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQktXg5_v8-L9AslphhrFvphE12SWkGl-_Jig&usqp=CAU',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      shelter_id: 1,
      name: 'Dark',
      birthday: '2023-01-01',
      size: 'Small',
      personality: 'Calma e carinhosa',
      species: 'Dog',
      status: 'Available',
      profilePictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQktXg5_v8-L9AslphhrFvphE12SWkGl-_Jig&usqp=CAU',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      shelter_id: 1,
      name: 'Chewbacca',
      birthday: '2023-01-01',
      size: 'Mini',
      personality: 'Agitado e brincalhão',
      species: 'Dog',
      status: 'Available',
      profilePictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQktXg5_v8-L9AslphhrFvphE12SWkGl-_Jig&usqp=CAU',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      shelter_id: 1,
      name: 'Tereza',
      birthday: '2023-01-01',
      size: 'Big',
      personality: 'Arisca',
      species: 'Dog',
      status: 'Available',
      profilePictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQktXg5_v8-L9AslphhrFvphE12SWkGl-_Jig&usqp=CAU',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      shelter_id: 1,
      name: 'Rabugento',
      birthday: '2023-01-01',
      size: 'Medium',
      personality: 'Rabugento e preguiçoso',
      species: 'Dog',
      status: 'Available',
      profilePictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQktXg5_v8-L9AslphhrFvphE12SWkGl-_Jig&usqp=CAU',
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
      profilePictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQktXg5_v8-L9AslphhrFvphE12SWkGl-_Jig&usqp=CAU',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      shelter_id: 1,
      name: 'Penelope',
      birthday: '2023-01-01',
      size: 'Mini',
      personality: 'Arisca e tímida',
      species: 'Cat',
      status: 'Available',
      profilePictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQktXg5_v8-L9AslphhrFvphE12SWkGl-_Jig&usqp=CAU',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      shelter_id: 1,
      name: 'Lampeão',
      birthday: '2023-01-01',
      size: 'Small',
      personality: 'Perigoso e dançarino',
      species: 'Dog',
      status: 'Available',
      profilePictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQktXg5_v8-L9AslphhrFvphE12SWkGl-_Jig&usqp=CAU',
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
      profilePictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQktXg5_v8-L9AslphhrFvphE12SWkGl-_Jig&usqp=CAU',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      shelter_id: 1,
      name: 'Dengo',
      birthday: '2023-01-01',
      size: 'Mini',
      personality: 'Desconfiado, agitado e carinhoso',
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