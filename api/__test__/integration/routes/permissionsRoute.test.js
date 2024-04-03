process.env.NODE_ENV = 'test'

const app = require('../../../app')
const request = require('supertest')
const database = require('../../../models')

describe('Permissions', () => {
  let permissionId

  afterAll(async () => {
    await database.Permission.destroy({
      where: {},
    })
  })
  
  describe('POST /permissions', () => {
    
    it('should create one permission', async () => {
      const res = await request(app)
        .post('/api/permissions')
        .set('Accept', 'application/json')
        .send({
          name: 'read',
          description: 'read the content'
        })

      expect(res.status).toEqual(201)
      expect(res.headers['content-type']).toMatch(/json/)
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('description')
    })
  })

  describe('GET /permissions', () => {
    
    it('should return an array of permissions', async () => {
      const res = await request(app)
        .get('/api/permissions')
        
      expect(res.status).toEqual(200)
      expect(res.body).toHaveLength(1)
      expect(res.body).toEqual(expect.arrayContaining(
        [
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            description: expect.any(String)
          })
        ]
      ))

      permissionId = res.body[0].id
    })
  }) 

  describe('GET /permissions/{id}', () => {
    it('should return one permission', async () => {
      const res = await request(app)
        .get(`/api/permissions/${permissionId}`)
        
      expect(res.status).toEqual(200)
      expect(res.body).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          description: expect.any(String)
        })
      )
    })
  })

  describe('PUT /permissions/{id}', () => {
    it('should update one permission', async () => {
      const res = await request(app)
        .put(`/api/permissions/${permissionId}`)
        .send({ name: 'shelter' })
        .set('Accept', 'application/json')
        
      expect(res.status).toEqual(200)
      expect(res.headers['content-type']).toMatch(/json/)
      expect(res.body.name).toMatch('shelter')
    })
  })

  describe('DELETE /permissions/{id}', () => {
    it('should delete one permission', async () => {
      const res = await request(app)
        .delete(`/api/permissions/${permissionId}`)
        
      expect(res.status).toEqual(200)
    })
  })
})