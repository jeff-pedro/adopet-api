'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Tutor', [{
            name: 'John Wick',
            email: 'jonh.wick@mail.com',
            password: 'jonh123',
            phone: '+711233334444',
            city: 'Padhorje',
            bio: 'I am a loving tutor',
            photo: 'https://images.com/images/image1'
        }, 
        {
            name: 'Dick Dastardly',
            email: 'dick.dastardly@mail.com',
            password: 'dick123',
            phone: '+188244442222',
            city: 'Los Angeles',
            bio: 'I am a attencious tutor',
            photo: 'https://images.com/images/image1'
        },
        {
            name: 'Newt Scamander',
            email: 'newt.scamander@mail.com',
            password: 'newt123',
            phone: '+4466211115555',
            city: 'London',
            bio: 'I am a caring tutor',
            photo: 'https://images.com/images/image1'
        }
        ], {})
    },

    async down (queryInterface, Sequelize) {

        await queryInterface.bulkDelete('Tutor', null, {})
     
    }
}
