process.env.NODE_ENV = 'test'

const app = require('../../../app')
const database = require('../../../models')
const request = require('supertest')

// jest.mock('../../../models')

describe('Tutors', () => {
  // FIX IT: add as environment variable
  const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoibHVmZnlAbWFpbC5jb20iLCJpYXQiOjE3MTA5NzU5MjgsImV4cCI6MTc0MjUxMTkyOH0.f-2HggfgWfuD1J9d3SeuCbRH7FrPEKV2Hpi9YDFEV-Q'
  
  let tutorObject
  let tutorId

  beforeAll(async () => {
    const userObject = {
      name: 'Will Turner',
      email: 'tuner@pirates.sea',
      password: 'tuner123',
      phone: '+011233334444',
      city: 'England',
      about: 'I am cute and love all animals of world',
      profilePictureUrl: 'https://images.com/images/image-turner',
      role: 'standard'
    }

    // create user
    await request(app)
      .post('/api/tutors')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(userObject)

    // get last user
    const user = await request(app)
      .get('/api/tutors')
      .set('Authorization', `Bearer ${accessToken}`)

    const { id } = user.body[user.body.length - 1]

    console.log(id)

    tutorId = id
  })

  afterAll(async () => {
    // clean database
    database.User.destroy({
      where: {},
      // truncate: true
    })
  })

  describe('GET /api/tutors', () => {
    it('should list all tutors', async () => {
      const res = await request(app)
        .get('/api/tutors/')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${accessToken}`)

      expect(res.headers['content-type']).toMatch(/json/)
      expect(res.status).toEqual(200)
    })
  })

  describe('POST /api/tutors', () => {
    it('should create a new tutor', async () => {
      tutorObject = {
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
        .set('Authorization', `Bearer ${accessToken}`)

      console.log(res.status)

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
        .set('Authorization', `Bearer ${accessToken}`)
        .send({})

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual('empty request body')
    })
  })

  describe('GET /api/tutors/{id}', () => {
    it('should return one tutor', async () => {
      const res = await request(app)
        .get(`/api/tutors/${tutorId}`)
        .set('Authorization', `Bearer ${accessToken}`)

      expect(res.status).toBe(200)
      // expect(res.body.email).toEqual('sparrow@pirates.sea')
    })

    it('should return 404 if any data is found', async () => {
      const res = await request(app)
        .get('/api/tutors/0')
        .set('Authorization', `Bearer ${accessToken}`)

      expect(res.status).toBe(404)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual('Error: Tutor not found')
    })
  })

  describe('PUT /api/tutors/{id}', () => {
    it('should update some fields', async () => {
      const res = await request(app)
        .put(`/api/tutors/${tutorId}`)
        .set('Authorization', `Bearer ${accessToken}`)
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

      const res = await request(app)
        .put(`/api/tutors/${tutorId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(param)

      expect(res.status).toBe(204)
    })
  })

  describe('PATCH /api/tutors/{id}', () => {
    it('should update only one field', async () => {
      const res = await request(app)
        .patch(`/api/tutors/${tutorId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          password: 'pass123'
        })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toEqual('tutor updated')
    })

    it('should return an error if try update more than one field', async () => {
      const res = await request(app)
        .patch(`/api/tutors/${tutorId}`)
        .set('Authorization', `Bearer ${accessToken}`)
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
        .delete(`/api/tutors/${tutorId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
    })

  })
})