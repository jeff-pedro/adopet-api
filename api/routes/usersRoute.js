const { Router } = require('express')
const UsersController = require('../controllers/UsersController.js')
const pagination = require('../middlewares/pagination.js')
const authorization = require('../middlewares/authorization.js')

const usersController = new UsersController()

const routes = Router()

// public endpoint
routes
  .post('/users', (req, res, next) => usersController.createNew(req, res, next))
  .get('/users/:id', (req, res, next) => usersController.getById(req, res, next))

// private endpoints
routes
  .get('/users', authorization, (req, res, next) => usersController.getAll(req, res, next), pagination)
  .get('/users/:id/restore', authorization, (req, res, next) => usersController.retore(req, res, next))
  .put('/users/:id', authorization, (req, res, next) => usersController.updateMany(req, res, next))
  .patch('/users/:id', authorization, (req, res, next) => usersController.updateOne(req, res, next))
  .delete('/users/:id', authorization, (req, res, next) => usersController.delete(req, res, next))

module.exports = routes
