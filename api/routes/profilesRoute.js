const { Router } = require('express')
const routes = Router()
const ProfilesController = require('../controllers/ProfilesController')

routes
  .post('/profiles', ProfilesController.createProfile)
  .get('/profiles', ProfilesController.getAllProfiles)
  .get('/profiles/:id', ProfilesController.getOneProfile)
  .put('/profiles/:id', ProfilesController.updateProfile)
  .delete('/profiles/:id', ProfilesController.deleteProfile)

module.exports = routes
