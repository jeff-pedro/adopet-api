const { Router } = require('express')
const SheltersController = require('../controllers/SheltersController.js')
const routes = Router()

routes
  .post('/shelters', SheltersController.createShelter)
  .get('/shelters', SheltersController.getAllShelters)


module.exports = routes