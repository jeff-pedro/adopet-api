process.env.NODE_ENV = 'test'

const app = require('../../../app')
const request = require('supertest')

// jest.mock('../../../models')

describe('Tutors', () => {

  describe('GET /api/tutors', () => {
    it('should list all tutors', async () => {
      const res = await request(app)
        .get('/api/tutors/')
        .set('Accept', 'application/json')
      expect(res.headers['content-type']).toMatch(/json/)
      expect(res.status).toEqual(200)
    })
  })

  describe('POST /api/tutors', () => {
    it('should create a new tutor', async () => {
      const tutorObject = {
        name: 'Jack Sparrow',
        email: 'sparrow@pirates.sea',
        password: 'jack123',
        phone: '+011233334444',
        city: 'Tortuga',
        about: 'I am the best tutor',
        profilePictureUrl: 'https://images.com/images/image-jack',
        role: 'standard'
      }

      const res = await request(app)
        .post('/api/tutors')
        .send(tutorObject)
        .set('Accept', 'application/json')

      expect(res.status).toEqual(200)
      // expect(res.body).toEqual(
      //   expect.objectContaining({
      //     id: expect.any(Number),
      //     ...tutorObject,
      //     createdAt: expect.any(String),
      //     updatedAt: expect.any(String)
      //   })
      // )
    })

    it('should return an error if the request body is empty', async () => {
      const res = await request(app)
        .post('/api/tutors')
        .set('Accept', 'application/json')
        .send({})

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual('empty request body')
    })
  })

  describe('GET /api/tutors/{id}', () => {
    it('should return one tutor', async () => {

      const tutor = await request(app)
        .get('/api/tutors')

      const { id } = tutor.body[tutor.body.length - 1]

      const res = await request(app)
        .get(`/api/tutors/${id}`)

      expect(res.status).toBe(200)
      // expect(res.body.email).toEqual('sparrow@pirates.sea')
    })

    it('should return 404 if any data is found', async () => {
      const res = await request(app)
        .get('/api/tutors/0')

      expect(res.status).toBe(404)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual('Error: Tutor not found')
    })
  })

  describe('PUT /api/tutors/{id}', () => {
    it('should update some fields', async () => {

      const tutor = await request(app)
        .get('/api/tutors')

      const { id } = tutor.body[tutor.body.length - 1]

      const res = await request(app)
        .put(`/api/tutors/${id}`)
        .send({
          name: 'Captain Jack Sparrow',
        })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toEqual('tutor updated')
    })

    test.each([
      ['empty', {}],
      ['undefined', { somefield: 'some value' }]
    ])('should not update if provided an %s field', async (_, param) => {

      const tutor = await request(app)
        .get('/api/tutors')

      const { id } = tutor.body[tutor.body.length - 1]

      const res = await request(app)
        .put(`/api/tutors/${id}`)
        .send(param)

      expect(res.status).toBe(204)
    })
  })

  describe('PATCH /api/tutors/{id}', () => {
    it('should update only one field', async () => {

      const tutor = await request(app)
        .get('/api/tutors')

      const { id } = tutor.body[tutor.body.length - 1]

      const res = await request(app)
        .patch(`/api/tutors/${id}`)
        .send({
          password: 'pass123'
        })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toEqual('tutor updated')
    })

    it('should return an error if try update more than one field', async () => {

      const tutor = await request(app)
        .get('/api/tutors')

      const { id } = tutor.body[tutor.body.length - 1]

      const res = await request(app)
        .patch(`/api/tutors/${id}`)
        .send({
          city: 'Port Royal',
          role: 'administrator'
        })

      expect(res.status).toBe(422)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual('only one property can be updated at a time')
    })
  })

  describe('DELETE /api/tutors/{id}', () => {
    it('should delete one tutor', async () => {

      const tutor = await request(app)
        .get('/api/tutors')

      const { id } = tutor.body[tutor.body.length - 1]

      await request(app)
        .delete(`/api/tutors/${id}`)
        .expect(200)
    })

  })
})