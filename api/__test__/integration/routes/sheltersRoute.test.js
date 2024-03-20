process.env.NODE_ENV = 'test'

const request = require('supertest')
const app = require('../../../app')

// jest.mock('../../../models')

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

  describe('GET /api/shelters', () => {
    it('should list all shelters', async () => {
      const res = await request(app)
        .get('/api/shelters')
        .set('Accept', 'application/json')
      expect(res.headers['content-type']).toMatch(/json/)
      expect(res.status).toEqual(200)
      // expect(res.body).toHaveLength(1)
    })
  })

  describe('POST /api/shelters', () => {
    it('should create a new pet', async () => {
      const res = await request(app)
        .post('/api/shelters')
        .send(shelterObj)
        .expect(200)

      shelterId = res.body.id
    })

    it('should return an error if the request body is empty', async () => {
      const res = await request(app)
        .post('/api/shelters')
        .set('Accept', 'application/json')
        .send({})
    
      expect(res.status).toBe(422)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual('empty request body')
    })
  })

  describe('GET /api/shelters/{id}', () => {
    it('should return one shelter', async () => {
      const res = await request(app)
        .get(`/api/shelters/${shelterId}`)

      expect(res.status).toBe(200)
      expect(res.body.name).toEqual('Caribbean Crazy Animals')
    })

    it('should return status 404 if any data is found', async () => {
      const res = await request(app)
        .get('/api/shelters/0')

      expect(res.status).toBe(404)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual('Error: Shelter not found')
    })
  })

  describe('PUT /api/shelters/{id}', () => {
    it('should update some fields', async () => {
      const res = await request(app)
        .put(`/api/shelters/${shelterId}`)
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
        .put(`/api/shelters/${shelterId}`)
        .send(param)

      expect(res.status).toBe(204)
    })
  })

  describe('PATCH /api/shelters/{id}', () => {
    it('should update only one field', async () => {
      const res = await request(app)
        .patch(`/api/shelters/${shelterId}`)
        .send({
          phone: '+0111222333',
        })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toEqual('shelter updated')
    })

    it('should return an error if try update more than one field', async () => {
      const res = await request(app)
        .patch(`/api/shelters/${shelterId}`)
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
        .delete(`/api/shelters/${shelterId}`)
        .expect(200)
    })
  })

})