const { Router } = require('express')
const TurtorsController = require('../controllers/TutorsController')
const router = Router()

router
    .get('/tutors', TurtorsController.getAllTutors)
    .post('/tutors', TurtorsController.createTutor)

module.exports = router
