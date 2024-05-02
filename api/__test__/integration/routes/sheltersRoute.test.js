process.env.NODE_ENV = 'test'

const request = require('supertest')
const { v4: uuid } = require('uuid')
const app = require('../../../app')
const login = require('../../helper/userLogin')

const database = require('../../../models')

// jest.mock('../../../models')

describe('Shelter', () => {
  let shelterObj
  let shelter
  const auth = {}

  beforeAll(async () => {
    await login(auth, request, app)

    shelterObj = {
      id: uuid(),
      name: 'Caribbean Crazy Animals',
      email: 'contact@crazyanimals.sea',
      phone: '+08898985421',
      city: 'Port Royal',
      state: 'Caribbean'
    }

    try {
      shelter = await database.Shelter.create(shelterObj)
    } catch (err) {
      console.log(err)
    }

  })


  afterAll(async () => {
    // await database.Shelter.destroy({ where: {} })
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
      expect(res.body.name).toEqual('Caribbean Crazy Animals')
    })

    it.skip('should return status 404 if any data is found', async () => {
      const res = await request(app)
        .get('/api/shelters/0')
        .set('Authorization', `Bearer ${auth.token}`)

      expect(res.status).toBe(404)
      expect(res.body).toHaveProperty('error')
      // expect(res.body.error).toEqual('Error: Shelter not found')
    })
  })


  describe('POST /api/shelters', () => {
    it('should create a new pet', async () => {
      await request(app)
        .post('/api/shelters')
        .set('Authorization', `Bearer ${auth.token}`)
        .send({
          id: uuid(),
          name: 'Adopet Shelter',
          email: 'contact@adopet.com',
          phone: '+08898985421',
          city: 'São Paulo',
          state: 'São Paulo'
        })
        .expect(200)
    })

    it.skip('should return an error if the request body is empty', async () => {
      const res = await request(app)
        .post('/api/shelters')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${auth.token}`)
        .send({})

      expect(res.status).toBe(422)
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
