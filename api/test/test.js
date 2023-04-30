const db = require('../models')
const app = require('../app')
const request = require('supertest')

test('test', async () => {
  const res = await request(app)
    .post('/tutors')
    .send({
      name: '',
      email: 'jack@pirates.sea',
      password: 'jack123',
      phone: '+011233334444',
      city: 'Tortuga',
      about: 'I am the best tutor',
      profilePictureUrl: 'https://images.com/images/image-jack',
      role: 'standard'
    })
  expect(200)

})