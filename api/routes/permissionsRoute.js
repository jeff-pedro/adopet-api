const { Router } = require('express')
const routes = Router()
const PermissionsController = require('../controllers/PermissionsController')

routes
  .post('/permissions', PermissionsController.createPermission)
  .get('/permissions', PermissionsController.getAllPermissions)
  .get('/permissions/:id', PermissionsController.getOnePermission)
  .put('/permissions/:id', PermissionsController.updatePermission)
  .delete('/permissions/:id', PermissionsController.deletePermission)

module.exports = routes
