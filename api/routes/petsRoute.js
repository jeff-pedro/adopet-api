const { Router } = require('express')
const PetsController = require('../controllers/PetsController.js')
const pagination = require('../middlewares/pagination.js')
const authorization = require('../middlewares/authorization.js')
const profile = require('../middlewares/profile.js')

const petsController = new PetsController()

const routes = Router()

// public endpoints
routes
  .get('/pets', (req, res, next) => petsController.getAll(req, res, next), pagination)

// private endpoints
routes
  .post('/pets', authorization, (req, res, next) => petsController.createNew(req, res, next))
  .post('/pets/:id/adoption', (req, res) => petsController.adopt(req, res))
  .get('/pets/:id/adoption/cancel',authorization, profile(['shelter']), (req, res) => petsController.cancelAdoption(req, res))
  .get('/pets/:id/restore', authorization, (req, res, next) => petsController.retore(req, res, next))
  .get('/pets/:id', authorization, (req, res, next) => petsController.getById(req, res, next))
  .put('/pets/:id', authorization, (req, res, next) => petsController.updateMany(req, res, next))
  .patch('/pets/:id', authorization, (req, res, next) => petsController.updateOne(req, res, next))
  .delete('/pets/:id', authorization, (req, res, next) => petsController.delete(req, res, next))

module.exports = routes