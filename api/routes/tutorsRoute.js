const { Router } = require('express')
const TurtorsController = require('../controllers/TutorsController')
const pagination = require('../middlewares/pagination.js')
const authorization = require('../middlewares/authorization.js')

const turtorsController = new TurtorsController()

const routes = Router()

// public endpoint
routes
  .post('/tutors', (req, res, next) => turtorsController.createNew(req, res, next))
  .get('/tutors/:id', (req, res, next) => turtorsController.getById(req, res, next))

// private endpoints
routes
  .get('/tutors', authorization, (req, res, next) => turtorsController.getAll(req, res, next), pagination)
  .put('/tutors/:id', authorization, (req, res, next) => turtorsController.updateMany(req, res, next))
  .patch('/tutors/:id', authorization, (req, res, next) => turtorsController.updateOne(req, res, next))
  .delete('/tutors/:id', authorization, (req, res, next) => turtorsController.delete(req, res, next))

module.exports = routes
