const tutors = require('./tutorsRoute.js')
const shelters = require('./sheltersRoute.js')
const pets = require('./petsRoute.js')
const auth = require('./authRoute.js')
const profiles = require('./profilesRoute.js')
const permissions = require('./permissionsRoute.js')
const security = require('./securityRoute.js')

module.exports = (app) => {
  /* GET home page. */
  app.get('/', function (req, res) {
    res.status(200).json({ message: 'Welcome to Adopet API 🐾' })
  })

  app.use('/api',
    auth,
    pets,
    tutors,
    shelters,
    profiles,
    permissions,
    security,
  )
}
