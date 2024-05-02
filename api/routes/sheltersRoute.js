const { Router } = require('express')
const SheltersController = require('../controllers/SheltersController.js')
const pagination = require('../middlewares/pagination.js')
const authorization = require('../middlewares/authorization.js')

const sheltersController = new SheltersController()

const routes = Router()

routes.use(authorization)

routes
  .post('/shelters', (req, res, next) => sheltersController.createNew(req, res, next))
  .get('/shelters', (req, res, next) => sheltersController.getAll(req, res, next), pagination)
  .get('/shelters/:id', (req, res, next) => sheltersController.getById(req, res, next))
  .put('/shelters/:id', (req, res, next) => sheltersController.updateMany(req, res, next))
  .patch('/shelters/:id', (req, res, next) => sheltersController.updateOne(req, res, next))
  .delete('/shelters/:id', (req, res, next) => sheltersController.delete(req, res, next))

module.exports = routes