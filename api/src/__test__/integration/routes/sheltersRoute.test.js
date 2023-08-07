process.env.NODE_ENV = 'test'

const app = require('../../../app')
const db = require('../../../models')
const request = require('supertest')

jest.mock('../../../models')

describe('Shelter', () => {
  let shelterId
  let shelterObj

  beforeEach(() => {
    shelterObj = {
      name: 'Caribbean Crazy Animals',
      email: 'contact@crazyanimals.sea',
      phone: '+08898985421',
      city: 'Port Royal',
      state: 'Caribbean'
    }
  })

  describe('GET /shelters', () => {
    it('should list all shelters', async () => {
      const res = await request(app)
        .get('/shelters')
        .set('Accept', 'application/json')
      expect(res.headers['content-type']).toMatch(/json/)
      expect(res.status).toEqual(200)
      expect(res.body).toHaveLength(1)
    })
  })

  describe('POST /shelters', () => {
    it('should create a new pet', async () => {
      const res = await request(app)
        .post('/shelters')
        .send(shelterObj)
        .expect(200)

      shelterId = res.body.id
    })

    it('should return an error if the request body is empty', async () => {
      const res = await request(app)
        .post('/shelters')
        .set('Accept', 'application/json')
        .send({})
    
      expect(res.status).toBe(422)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual('empty request body')
    })
  })

  describe('GET /shelters/{id}', () => {
    it('should return one shelter', async () => {
      const res = await request(app)
        .get(`/shelters/${shelterId}`)

      expect(res.status).toBe(200)
      expect(res.body.name).toEqual('Caribbean Crazy Animals')
    })

    it('should return status 404 if any data is found', async () => {
      const res = await request(app)
        .get('/shelters/0')

      expect(res.status).toBe(404)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual('Shelter not found')
    })
  })

  describe('PUT /shelters/{id}', () => {
    it('should update some fields', async () => {
      const res = await request(app)
        .put(`/shelters/${shelterId}`)
        .send({
          email: 'contact@cca.sea',
          city: 'Isla de Muerta',
        })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toEqual('shelter updated')
    })

    test.each([
      ['empty', {}],
      ['undefined', { somefield: 'some value' }]
    ])('should not update if provided an %s field', async (_, param) => {
      const res = await request(app)
        .put(`/shelters/${shelterId}`)
        .send(param)

      expect(res.status).toBe(204)
    })
  })

  describe('PATCH /shelters/{id}', () => {
    it('should update only one field', async () => {
      const res = await request(app)
        .patch(`/shelters/${shelterId}`)
        .send({
          phone: '+0111222333',
        })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toEqual('shelter updated')
    })

    it('should return an error if try update more than one field', async () => {
      const res = await request(app)
        .patch(`/shelters/${shelterId}`)
        .send({
          name: 'Caribbean Pet Shelter',
          email: 'contact@cps.sea'
        })

      expect(res.status).toBe(422)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual('only one property can be updated at a time')
    })
  })

  describe('DELETE /shelters/{id}', () => {
    it('should delete one shelter', async () => {
      await request(app)
        .delete(`/shelters/${shelterId}`)
        .expect(200)
    })
  })

})