const { Router } = require('express')
const SheltersController = require('../controllers/SheltersController.js')
const routes = Router()

routes
  .post('/shelters', SheltersController.createShelter)


module.exports = routes