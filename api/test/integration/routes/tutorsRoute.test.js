process.env.NODE_ENV = 'test'

const app = require('../../../app')
const request = require('supertest')

describe('Tutors', () => {

  let tutorId

  describe('GET /tutors', () => {
    it('should list all tutors', async () => {
      const res = await request(app)
        .get('/tutors')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('content-type', /json/)

      expect(res.body[0].name).toEqual('John Wick')
      expect(res.body[0].email).toEqual('jonh.wick@mail.com')
    })
  })

  describe('POST /tutors', () => {
    it('shoud create a new tutor', async () => {
      const res = await request(app)
        .post('/tutors')
        .send({
          name: 'Jack Sparrow',
          email: 'jack.sparrow@pirates.sea', // erro validation sem descrição do unique
          password: 'jack123',
          phone: '+011233334444',
          city: 'Tortuga',
          about: 'I am the best tutor',
          profilePictureUrl: 'https://images.com/images/image-jack',
          role: 'standard'
        })
        .expect(200)
      tutorId = res.body.id
    })

    //it('should thown an error if the request body is empty')
    //it('should thown an error if some proporty is empty')
  })

  describe('GET /tutors/{id}', () => {
    it('shoud return one tutor', async () => {
      const res = await request(app)
        .get(`/tutors/${tutorId}`)
        .expect(200)
      expect(res.body.email).toEqual('jack.sparrow@pirates.sea')
    })
  })

  describe('DELETE /tutors/{id}', () => {
    it('shoud delete one tutor', async () => {
      await request(app)
        .delete(`/tutors/${tutorId}`)
        .expect(200)
    })

  })
})