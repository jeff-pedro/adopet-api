'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Users', [{
            name: 'John Wick',
            email: 'jonh.wick@mail.com',
            password: 'jonh123',
            phone: '+711233334444',
            city: 'Padhorje',
            about: 'I am a loving tutor',
            profilePictureUrl: 'https://images.com/images/image-john',
            role: 'standard',
            createdAt: new Date(),
            updatedAt: new Date()
        }, 
        {
            name: 'Dick Dastardly',
            email: 'dick.dastardly@mail.com',
            password: 'dick123',
            phone: '+188244442222',
            city: 'Los Angeles',
            about: 'I am a attencious tutor',
            profilePictureUrl: 'https://images.com/images/image-dick',
            role: 'standard',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Newt Scamander',
            email: 'newt.scamander@mail.com',
            password: 'newt123',
            phone: '+4466211115555',
            city: 'London',
            about: 'I am a caring tutor',
            profilePictureUrl: 'https://images.com/images/newt',
            role: 'standard',
            createdAt: new Date(),
            updatedAt: new Date()
        }
        ], {})
    },

    async down (queryInterface, Sequelize) {

        await queryInterface.bulkDelete('Users', null, {})
     
    }
}
