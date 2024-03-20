const { Router } = require('express')
const TurtorsController = require('../controllers/TutorsController')
const pagination = require('../middlewares/pagination.js')
const authorization = require('../middlewares/authorization.js')

const routes = Router()

routes.use(authorization)

routes
  .get('/tutors', TurtorsController.getAllTutors, pagination)
  .get('/tutors/:id', TurtorsController.getOneTutor)
  .post('/tutors', TurtorsController.createTutor)
  .put('/tutors/:id', TurtorsController.updateManyTutorProperties)
  .patch('/tutors/:id', TurtorsController.updateOneTutorProperty)
  .delete('/tutors/:id', TurtorsController.deleteTutor)

module.exports = routes
