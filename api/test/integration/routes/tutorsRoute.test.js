process.env.NODE_ENV = 'test'

const app = require('../../../app')
const db = require('../../../models')
const request = require('supertest')

describe('Tutors', () => {
  let tutorId
  let tutorObj

  beforeAll(async () => {
    // Clean the database
    await db.User.destroy({ where: {} })

    // Initialize the databases    
    await db.sequelize.sync()
  })

  beforeEach(() => {
    tutorObj = {
      name: 'Jack Sparrow',
      email: 'jack.sparrow@pirates.sea',
      password: 'jack123',
      phone: '+011233334444',
      city: 'Tortuga',
      about: 'I am the best tutor',
      profilePictureUrl: 'https://images.com/images/image-jack',
      role: 'standard'
    }
  })

  describe('GET /tutors', () => {
    it('should list all tutors', async () => {
      const res = await request(app)
        .get('/tutors')
        .set('Accept', 'application/json')
      expect(res.headers['content-type']).toMatch(/json/)
      expect(res.status).toEqual(200)
      expect(res.body).toHaveLength(0)
    })
  })

  describe('POST /tutors', () => {
    it('should create a new tutor', async () => {
      // erro validation: não retorna uma msg quando o valor na propriedade já existe duplicado ('unique constraint')
      const res = await request(app)
        .post('/tutors')
        .send(tutorObj)
        .expect(200)
      tutorId = res.body.id
    })

    it('should return an error if the request body is empty', async () => {
      const res = await request(app)
        .post('/tutors')
        .set('Accept', 'application/json')
        .send({})

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual('empty request body')

    })
    // sobre o curso aqui....
    it('should return an error if some property is empty', async () => {

      tutorObj.name = ''

      const res = await request(app)
        .post('/tutors')
        .set('Accept', 'application/json')
        .send(tutorObj)

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toMatch('field cannot be empty')
    })

    it('should have all properties populated with the right type', async () => {
      // criar um novo objeto
      tutorObj.email = 'j@j.com'

      const res = await request(app)
        .post('/tutors')
        .set('Accept', 'application/json')
        .send(tutorObj)

      expect(res.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          email: expect.any(String),
          password: expect.any(String),
          phone: expect.any(String),
          city: expect.any(String),
          about: expect.any(String),
          profilePictureUrl: expect.any(String),
          role: expect.any(String)
        })
      )
    })
  })

  describe('GET /tutors/{id}', () => {
    it('shoud return one tutor', async () => {
      const res = await request(app)
        .get(`/tutors/${tutorId}`)

      expect(res.status).toBe(200)
      expect(res.body.email).toEqual('jack.sparrow@pirates.sea')
    })
  })

  describe('PUT /tutors/{id}', () => {
    it('should update some fields', async () => {
      const res = await request(app)
        .put(`/tutors/${tutorId}`)
        .send({
          name: 'Captain Jack Sparrow',
          email: 'captain@theblackpearl.sea',
        })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toEqual('tutor updated')
    })

    test.each([
      ['empty', {}],
      ['undefined', { somefield: 'some value' }]
    ])('should not update if provided an %s field', async (_,param) => {
      const res = await request(app)
        .put(`/tutors/${tutorId}`)
        .send(param)

      expect(res.status).toBe(204)
    })
  })

  describe('PATCH /tutors/{id}', () => {
    it('should update only one field', async () => {
      const res = await request(app)
        .patch(`/tutors/${tutorId}`)
        .send({
          email: 'captain@theblackpearl.sea'
        })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toEqual('tutor updated')
    })

    it('should return an error if given more than one field', async () => {
      const res = await request(app)
        .patch(`/tutors/${tutorId}`)
        .send({
          password: 'pass123',
          role: 'administrator'
        })

      expect(res.status).toBe(422)
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