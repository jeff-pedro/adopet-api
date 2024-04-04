const database = require('../../models')

const { TutorService } = require('../../services')
const tutorService = new TutorService()

async function createUser() {
  try {
    const user = await database.User.findOne({
      where: {
        email: 'tuner@pirates.sea'
      }
    })
    
    if (!user) {
      await tutorService.create({
        name: 'Will Turner',
        email: 'tuner@pirates.sea',
        password: 'tuner123',
      })
    }

    return 
  } catch (err) {
    throw new Error(err.message)
  }
}

const login = async (auth, request, app) => {

  await createUser()

  const res = await request(app)
    .post('/api/login')
    .send({
      email: 'tuner@pirates.sea',
      password: 'tuner123',
    })
    .expect(200)
  
  auth.token = await res.body.accessToken
  
  return
}

module.exports = login