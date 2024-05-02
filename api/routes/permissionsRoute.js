const routes = require('express').Router()
const PermissionsController = require('../controllers/PermissionsController.js')
const pagination = require('../middlewares/pagination.js')

const permissionsController = new PermissionsController()


routes
  .post('/permissions', (req, res, next) => permissionsController.createNew(req, res, next))
  .get('/permissions', (req, res, next) => permissionsController.getAll(req, res, next), pagination)
  .get('/permissions/:id', (req, res, next) => permissionsController.getById(req, res, next))
  .put('/permissions/:id', (req, res, next) => permissionsController.updateMany(req, res, next))
  .delete('/permissions/:id', (req, res, next) => permissionsController.delete(req, res, next))

module.exports = routes
