process.env.NODE_ENV = 'test'

const app = require('../../../app')
const request = require('supertest')

const database = require('../../../models')

const { TutorService } = require('../../../services')
const tutorService = new TutorService()


describe('Login', () => {
  let user

  beforeAll(async () => {
    user = {
      name: 'Will Turner',
      email: 'tuner@pirates.sea',
      password: 'tuner123',
      phone: '+011233334444',
      city: 'England',
      about: 'I am cute and love all animals of world',
      profilePictureUrl: 'https://images.com/images/image-turner',
      role: 'standard'
    }
    
    await createUser(user)
  })

  afterAll(async () => {
    await database.User.destroy({ where: {} })
  })


  describe('GET /api/login', () => {
  
    it('should successfully login a user', async () => {
      const res = await request(app)
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: user.email,
          password: 'tuner123'
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
          password: 'turner123'
        })

      expect(res.status).toEqual(401)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual('This user not exist.')
    })
  })
})

async function createUser(user) {
  try {
    const userExists = await database.User.findOne({
      where: {
        email: user.email
      }
    })
    
    if (!userExists) {
      await tutorService.create(user)
    }

    return 
  } catch (err) {
    throw new Error(err.message)
  }
}