const request = require('supertest')
const app = require('../../app.js')
const tearDown = require('../helper/tearDown.js')
const { createRandomUsers } = require('../helper/seeders.js')


describe('Login', () => {
  let user

  beforeAll(async () => {
    user = await createRandomUsers()
  })

  afterAll(async () => {
    await tearDown()
  })


  describe('GET /api/login', () => {
  
    it('should successfully login a user', async () => {
      const res = await request(app)
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: user.email,
          password: 'secret'
        })

      expect(res.status).toEqual(200)
      expect(res.body).toHaveProperty('accessToken')
    })

    it('should show an error message when email or password is incorrect', async () => {
      const res = await request(app)
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: user.email,
          password: ''
        })

      expect(res.status).toEqual(401)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual('Invalid email or password.')
    })

    it('should show an error message when user was not exist', async () => {
      const res = await request(app)
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: 'wrong@mail.com',
          password: 'secret'
        })

      expect(res.status).toEqual(401)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual('This user not exist.')
    })
  })
})