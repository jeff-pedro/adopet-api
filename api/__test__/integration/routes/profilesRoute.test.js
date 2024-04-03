process.env.NODE_ENV = 'test'

const app = require('../../../app')
const request = require('supertest')
const database = require('../../../models')

describe('Profiles', () => {
  let profileId

  afterAll(async () => {
    await database.Profile.destroy({
      where: {},
    })
  })
  
  describe('POST /profiles', () => {
    
    it('should create one profile', async () => {
      const res = await request(app)
        .post('/api/profiles')
        .set('Accept', 'application/json')
        .send({
          name: 'tutor',
          description: 'user who is thinking about adopting pets'
        })

      expect(res.status).toEqual(201)
      expect(res.headers['content-type']).toMatch(/json/)
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('description')
    })
  })

  describe('GET /profiles', () => {
    
    it('should return an array of profiles', async () => {
      const res = await request(app)
        .get('/api/profiles')
        
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

      profileId = res.body[0].id
    })
  }) 

  describe('GET /profiles/{id}', () => {
    it('should return one profile', async () => {
      const res = await request(app)
        .get(`/api/profiles/${profileId}`)
        
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

  describe('PUT /profiles/{id}', () => {
    it('should update one profile', async () => {
      const res = await request(app)
        .put(`/api/profiles/${profileId}`)
        .send({ name: 'shelter' })
        .set('Accept', 'application/json')
        
      expect(res.status).toEqual(200)
      expect(res.headers['content-type']).toMatch(/json/)
      expect(res.body.name).toMatch('shelter')
    })
  })

  describe('DELETE /profiles/{id}', () => {
    it('should delete one profile', async () => {
      const res = await request(app)
        .delete(`/api/profiles/${profileId}`)
        
      expect(res.status).toEqual(200)
    })
  })
})