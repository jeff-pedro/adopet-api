process.env.NODE_ENV = 'test'

const request = require('supertest')

const app = require('../../../app')
const login = require('../../helper/userLogin.js')
const tearDown = require('../../helper/tearDown.js')
const { createRandomUsers } = require('../../helper/seeders.js')

// jest.mock('../../../models')

describe('Tutors', () => {
  let user
  const auth = {}

  beforeAll(async () => {
    user = await createRandomUsers()
    await login(auth, request, app)
  })

  afterAll(async () => {
    await tearDown()
  })


  describe('GET /api/tutors', () => {
    it('should list all tutors', async () => {
      const res = await request(app)
        .get('/api/tutors/')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${auth.token}`)

      expect(res.headers['content-type']).toMatch(/json/)
      expect(res.status).toEqual(200)
    })
  })

  describe('GET /api/tutors/{id}', () => {
    it('should return one tutor', async () => {
      const res = await request(app)
        .get(`/api/tutors/${user.id}`)
        .set('Authorization', `Bearer ${auth.token}`)

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('email')
    })

    it('should return status code 404 if any data is found', async () => {
      const res = await request(app)
        .get('/api/tutors/c0b785e4-4939-406e-9248-e85386dcd73c')
        .set('Authorization', `Bearer ${auth.token}`)

      expect(res.status).toBe(404)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual('record not found')
    })
  })

  describe('POST /api/tutors', () => {
    it('should create a new tutor', async () => {
      const res = await request(app)
        .post('/api/tutors')
        .send({
          name: 'Jack Sparrow',
          email: 'sparrow@pirates.sea',
          password: 'jack123',
          phone: '+011233334444',
          city: 'Tortuga',
          about: 'I am the best tutor',
          profilePictureUrl: 'https://images.com/images/image-jack',
          role: 'standard'
        })
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${auth.token}`)

      expect(res.status).toEqual(200)
    })

    it('should return an error if the request body is empty', async () => {
      const res = await request(app)
        .post('/api/tutors')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${auth.token}`)
        .send({})

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual('empty request body')
    })
  })

  describe('PUT /api/tutors/{id}', () => {
    it('should update some fields', async () => {
      const res = await request(app)
        .put(`/api/tutors/${user.id}`)
        .set('Authorization', `Bearer ${auth.token}`)
        .send({
          name: 'Captain Jack Sparrow',
        })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toEqual('updated')
    })

    test.each([
      ['empty', {}],
      ['undefined', { somefield: 'some value' }]
    ])('should not update if provided an %s field', async (_, param) => {

      const res = await request(app)
        .put(`/api/tutors/${user.id}`)
        .set('Authorization', `Bearer ${auth.token}`)
        .send(param)
      
      expect(res.status).toBe(204)
    })
  })

  describe('PATCH /api/tutors/{id}', () => {
    it('should update only one field', async () => {
      const res = await request(app)
        .patch(`/api/tutors/${user.id}`)
        .set('Authorization', `Bearer ${auth.token}`)
        .send({
          password: 'pass123'
        })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toEqual('updated')
    })

    it('should return an error if try update more than one field', async () => {
      const res = await request(app)
        .patch(`/api/tutors/${user.id}`)
        .set('Authorization', `Bearer ${auth.token}`)
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
      await request(app)
        .delete(`/api/tutors/${user.id}`)
        .set('Authorization', `Bearer ${auth.token}`)
        .expect(200)
    })

  })
})