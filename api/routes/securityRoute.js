const { Router } = require('express')
const routes = Router()
const SecurityController = require('../controllers/SecurityController')

routes
  .post('/security/profile/permissions', SecurityController.addProfilePermission)
  .get('/security/profile/permissions', SecurityController.getAllProfilePermissions)
  .get('/security/profile/permissions/id/:id', SecurityController.getOneProfilePermissions)

module.exports = routes