const { Router } = require('express')
const TurtorsController = require('../controllers/TutorsController')
const pagination = require('../middlewares/pagination.js')
const authorization = require('../middlewares/authorization.js')

const routes = Router()

// public endpoint
routes
  .post('/tutors', TurtorsController.createTutor)
  .get('/tutors/:id', TurtorsController.getOneTutor)

// private endpoints
routes
  .get('/tutors', authorization, TurtorsController.getAllTutors, pagination)
  .put('/tutors/:id', authorization, TurtorsController.updateManyTutorProperties)
  .patch('/tutors/:id', authorization, TurtorsController.updateOneTutorProperty)
  .delete('/tutors/:id', authorization, TurtorsController.deleteTutor)

module.exports = routes
