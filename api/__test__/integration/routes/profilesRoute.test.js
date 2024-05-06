process.env.NODE_ENV = 'test'

const request = require('supertest')

const app = require('../../../app')

const login = require('../../helper/userLogin.js')
const tearDown = require('../../helper/tearDown.js')


describe('Profiles', () => {
  let profileId
  const auth = {}

  beforeAll(async () => {
    await login(auth, request, app)
  })
  
  afterAll(async () => {
    await tearDown()
  })
  

  describe('POST /profiles', () => {
    
    it('should create one profile', async () => {
      const res = await request(app)
        .post('/api/profiles')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${auth.token}`)
        .send({
          name: 'tutor',
          description: 'user who is thinking about adopting pets'
        })

      expect(res.status).toEqual(200)
      expect(res.headers['content-type']).toMatch(/json/)
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('description')
    })
  })


  describe('GET /profiles', () => {
    
    it('should return an array of profiles', async () => {
      const res = await request(app)
        .get('/api/profiles')
        .set('Authorization', `Bearer ${auth.token}`)
        
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
        .set('Authorization', `Bearer ${auth.token}`)
        
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
        .set('Authorization', `Bearer ${auth.token}`)
        
      expect(res.status).toEqual(200)
      expect(res.headers['content-type']).toMatch(/json/)
      expect(res.body.content.name).toMatch('shelter')
    })
  })


  describe('DELETE /profiles/{id}', () => {

    it('should delete one profile', async () => {
      const res = await request(app)
        .delete(`/api/profiles/${profileId}`)
        .set('Authorization', `Bearer ${auth.token}`)
        
      expect(res.status).toEqual(200)
    })
  })
})