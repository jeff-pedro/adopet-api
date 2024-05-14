const { createRandomUsers } = require('../helper/seeders.js')

module.exports = async (auth, request, app) => {

  const { email } = await createRandomUsers()

  const res = await request(app)
    .post('/api/login')
    .send({
      email,
      password: 'secret',
    })
    .expect(200)
  
  auth.token = await res.body.accessToken
  auth.user = await res.body.user
}
