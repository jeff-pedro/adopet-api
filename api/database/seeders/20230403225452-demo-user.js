/* eslint-disable no-unused-vars */
'use strict'

const { genSaltSync, hashSync } = require('bcrypt')

const salt = genSaltSync()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      id: '110e23a2-88ab-4fcb-ad97-2660c4c00391',
      name: 'John Wick',
      email: 'john.wick@mail.com',
      password: hashSync('john123', salt),
      salt: genSaltSync(),
      phone: '+711233334444',
      city: 'Padhorje',
      about: 'I am a loving tutor',
      profilePictureUrl: 'https://images.com/images/image-john',
      role: 'standard',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '44b91718-e057-4c11-8f90-f53777555f46',
      name: 'Dick Dastardly',
      email: 'dick.dastardly@mail.com',
      password: hashSync('dick123', salt),
      salt: genSaltSync(),
      phone: '+188244442222',
      city: 'Los Angeles',
      about: 'I am a attencious tutor',
      profilePictureUrl: 'https://images.com/images/image-dick',
      role: 'standard',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '15d319fc-dc5b-4267-acb7-b10a741953c4',
      name: 'Newt Scamander',
      email: 'newt.scamander@mail.com',
      password: hashSync('newt123', salt),
      salt: genSaltSync(),
      phone: '+4466211115555',
      city: 'London',
      about: 'I am a caring tutor',
      profilePictureUrl: 'https://images.com/images/newt',
      role: 'standard',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'b53d4c86-a75b-4550-bf17-e83c688631ac',
      name: 'Hector Barbosa',
      email: 'barbosa@pirates.sea',
      password: hashSync('hector123', salt),
      salt: genSaltSync(),
      phone: '+011233334444',
      city: 'Lisbon',
      about: 'All pets loves me',
      profilePictureUrl: 'https://images.com/images/image-barbosa',
      role: 'administrator',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {})
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {})

  }
}
