process.env.NODE_ENV = 'test'

const app = require('../../../app')
const request = require('supertest')

describe('Login', () => {
  let userObject

  beforeAll(async () => {
    userObject = {
      name: 'Will Turner',
      email: 'tuner@pirates.sea',
      password: 'tuner123',
      phone: '+011233334444',
      city: 'England',
      about: 'I am cute and love all animals of world',
      profilePictureUrl: 'https://images.com/images/image-turner',
      role: 'standard'
    }

    await request(app)
      .post('/api/tutors')
      .set('Accept', 'application/json')
      .send(userObject)  
  })

  afterAll(async () => {
    const user = await request(app)
      .get('/api/tutors')

    const { id } = user.body[user.body.length - 1]

    await request(app)
      .delete(`/api/tutor${id}`)
  })

  describe('GET /api/login', () => {
    it('should successfully login a user', async () => {
      const res = await request(app)
        .get('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: userObject.email,
          password: 'tuner123'
        })

      expect(res.status).toEqual(200)
      expect(res.body).toHaveProperty('accessToken')
    })

    it('should show an error message when email or password is incorrect', async () => {
      const res = await request(app)
        .get('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: userObject.email,
          password: ''
        })

      expect(res.status).toEqual(401)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual('Invalid email or password.')
    })

    it('should show an error message when user was not exist', async () => {
      const res = await request(app)
        .get('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: 'wrong@mail.com',
          password: 'turner123'
        })

      expect(res.status).toEqual(401)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual('This user not exist.')
    })
  })
})