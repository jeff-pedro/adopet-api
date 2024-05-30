const request = require('supertest')
const app = require('../../app.js')
const login = require('../helper/userLogin.js')
const tearDown = require('../helper/tearDown.js')
const { createRandomUsers } = require('../helper/seeders.js')


describe('Users', () => {
  let user
  const auth = {}

  beforeAll(async () => {
    user = await createRandomUsers()
    await login(auth, request, app)
  })

  afterAll(async () => {
    await tearDown()
  })


  describe('GET /api/users', () => {
    it('should list all users', async () => {
      const res = await request(app)
        .get('/api/users/')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${auth.token}`)

      expect(res.headers['content-type']).toMatch(/json/)
      expect(res.status).toEqual(200)
    })
  })

  describe('GET /api/users/{id}', () => {
    it('should return one user', async () => {
      const res = await request(app)
        .get(`/api/users/${user.id}`)
        .set('Authorization', `Bearer ${auth.token}`)

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('email')
    })

    it('should return status code 404 if user is not found', async () => {
      jest.spyOn(console, 'error').mockImplementation(() => {})

      const res = await request(app)
        .get('/api/users/c0b785e4-4939-406e-9248-e85386dcd73c')
        .set('Authorization', `Bearer ${auth.token}`)

      expect(res.status).toBe(404)
      expect(res.body).toHaveProperty('error')
    })
  })

  describe('PUT /api/users/{id}', () => {
    it('should update some fields', async () => {
      const res = await request(app)
        .put(`/api/users/${user.id}`)
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
        .put(`/api/users/${user.id}`)
        .set('Authorization', `Bearer ${auth.token}`)
        .send(param)
      
      expect(res.status).toBe(204)
    })
  })

  describe('PATCH /api/users/{id}', () => {
    it('should update only one field', async () => {
      const res = await request(app)
        .patch(`/api/users/${user.id}`)
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
        .patch(`/api/users/${user.id}`)
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

  describe('DELETE /api/users/{id}', () => {
    it('should delete one user', async () => {
      await request(app)
        .delete(`/api/users/${user.id}`)
        .set('Authorization', `Bearer ${auth.token}`)
        .expect(200)
    })
  })
})