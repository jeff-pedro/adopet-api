const { Router } = require('express')
const TurtorsController = require('../controllers/TutorsController')
const router = Router()

router
    .get('/tutors', TurtorsController.getAllTutors)
    .get('/tutors/:id', TurtorsController.getOneTutor)
    .post('/tutors', TurtorsController.createTutor)
    .put('/tutors/:id', TurtorsController.updateManyTutorData)
    .patch('/tutors/:id', TurtorsController.updateOneTutorData)

module.exports = router
