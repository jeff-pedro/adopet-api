const { Router } = require('express')
const TurtorsController = require('../controllers/TutorsController')
const router = Router()

/* GET users listing. */
router
    .get('/tutors', TurtorsController.getAllTutors)

module.exports = router
