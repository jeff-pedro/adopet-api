
const request = require('supertest')
const app = require('../../app.js')
const tearDown = require('../helper/tearDown.js')
const { createRandomUsers } = require('../helper/seeders.js')


describe('Auth', () => {
  let user

  const mockUser = {
    name: 'Jack Sparrow',
    email: 'sparrow@pirates.sea',
    password: 'jack123',
    phone: '+011233334444',
    city: 'Tortuga',
    about: 'I am the best user',
    profilePictureUrl: 'https://images.com/images/image-jack',
    role: 'standard'
  }

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

    it('should return an error message when email or password is incorrect', async () => {
      const res = await request(app)
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: user.email,
          password: 'wrongPassword'
        })

      expect(res.status).toEqual(401)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual('Invalid email or password.')
    })

    it('should return an error message when user was not exist', async () => {
      const res = await request(app)
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: 'wrong@mail.com',
          password: 'secret'
        })

      expect(res.status).toEqual(404)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual('This user not exist.')
    })
  })

  describe('POST /api/register', () => {
    // jest.spyOn(console, 'error').mockImplementation(() => {})

    it('should create a new user', async () => {
      const res = await request(app)
        .post('/api/register')
        .send(mockUser)
        .set('Accept', 'application/json')

      expect(res.status).toEqual(201)
    })

    test.each([
      ['body', {}],
      ['password', {
        name: 'John Doe',
        email: 'test@mail.com',
      }]
    ])('should return error when no %s is provided', async (_, param) => {
      const res = await request(app)
        .post('/api/register')
        .send(param)

      expect(res.status).toBe(422)
      expect(res.body).toHaveProperty('error')
    })
  })

})