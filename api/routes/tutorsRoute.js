const { Router } = require('express')
const TurtorsController = require('../controllers/TutorsController')
const router = Router()

router
  .get('/tutors', TurtorsController.getAllTutors)
  .get('/tutors/:id', TurtorsController.getOneTutor)
  .post('/tutors', TurtorsController.createTutor)
  .put('/tutors/:id', TurtorsController.updateManyTutorProperties)
  .patch('/tutors/:id', TurtorsController.updateOneTutorProperty)
  .delete('/tutors/:id', TurtorsController.deleteTutor)

module.exports = router
