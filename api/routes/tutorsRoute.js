const { Router } = require('express')
const TurtorsController = require('../controllers/TutorsController')
const pagination = require('../middlewares/pagination.js')
const authorization = require('../middlewares/authorization.js')

const turtorsController = new TurtorsController()

const routes = Router()

// public endpoint
routes
  .post('/tutors', TurtorsController.createTutor)
  .get('/tutors/:id', TurtorsController.getOneTutor)

// private endpoints
routes
  .get('/tutors', authorization, (req, res, next) => turtorsController.getAll(req, res, next), pagination)
  .put('/tutors/:id', authorization, TurtorsController.updateManyTutorProperties)
  .patch('/tutors/:id', authorization, TurtorsController.updateOneTutorProperty)
  .delete('/tutors/:id', authorization, TurtorsController.deleteTutor)

module.exports = routes
