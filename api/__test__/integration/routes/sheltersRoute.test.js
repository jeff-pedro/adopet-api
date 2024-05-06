process.env.NODE_ENV = 'test'

const request = require('supertest')

const app = require('../../../app')
const login = require('../../helper/userLogin.js')
const tearDown = require('../../helper/tearDown.js')
const { createRandomShelters } = require('../../helper/seeders.js')

// jest.mock('../../../models')

describe('Shelter', () => {
  let shelter
  const auth = {}

  beforeAll(async () => {
    await login(auth, request, app)
    shelter = await createRandomShelters()
  })


  afterAll(async () => {
    await tearDown()
  })


  describe('GET /api/shelters', () => {
    
    it('should list all shelters', async () => {
      const res = await request(app)
        .get('/api/shelters')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${auth.token}`)
      
      expect(res.headers['content-type']).toMatch(/json/)
      expect(res.status).toEqual(200)
    })
  })


  describe('GET /api/shelters/{id}', () => {
    
    it('should return one shelter', async () => {
      const res = await request(app)
        .get(`/api/shelters/${shelter.id}`)
        .set('Authorization', `Bearer ${auth.token}`)

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('name')
    })

    it('should return status 404 if any data is found', async () => {
      const res = await request(app)
        .get('/api/shelters/00000000-0000-0000-0000-000000000000')
        .set('Authorization', `Bearer ${auth.token}`)
      
      expect(res.status).toBe(404)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toMatch('record not found')
    })
  })


  describe('POST /api/shelters', () => {
    
    it('should create a new pet', async () => {
      await request(app)
        .post('/api/shelters')
        .set('Authorization', `Bearer ${auth.token}`)
        .send({
          name: 'Adopet Shelter',
          email: 'contact@adopet.com',
          phone: '+08898985421',
          city: 'São Paulo',
          state: 'São Paulo'
        })
        .expect(200)
    })

    it('should return an error if the request body is empty', async () => {
      const res = await request(app)
        .post('/api/shelters')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${auth.token}`)
        .send({})
      
      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual('empty request body')
    })
  })


  describe('PUT /api/shelters/{id}', () => {
    
    it('should update some fields', async () => {
      const res = await request(app)
        .put(`/api/shelters/${shelter.id}`)
        .set('Authorization', `Bearer ${auth.token}`)
        .send({
          email: 'contact@cca.sea',
          city: 'Isla de Muerta',
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
        .put(`/api/shelters/${shelter.id}`)
        .set('Authorization', `Bearer ${auth.token}`)
        .send(param)

      expect(res.status).toBe(204)
    })
  })


  describe('PATCH /api/shelters/{id}', () => {

    it('should update only one field', async () => {
      const res = await request(app)
        .patch(`/api/shelters/${shelter.id}`)
        .set('Authorization', `Bearer ${auth.token}`)
        .send({
          phone: '+0111222333',
        })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toEqual('updated')
    })

    it('should return an error if try update more than one field', async () => {
      const res = await request(app)
        .patch(`/api/shelters/${shelter.id}`)
        .set('Authorization', `Bearer ${auth.token}`)
        .send({
          name: 'Caribbean Pet Shelter',
          email: 'contact@cps.sea'
        })

      expect(res.status).toBe(422)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual('only one property can be updated at a time')
    })
  })


  describe('DELETE /api/shelters/{id}', () => {

    it('should delete one shelter', async () => {
      await request(app)
        .delete(`/api/shelters/${shelter.id}`)
        .set('Authorization', `Bearer ${auth.token}`)
        .expect(200)
    })
  })
})
