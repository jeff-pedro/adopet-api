const { Router } = require('express')
const SheltersController = require('../controllers/SheltersController.js')
const routes = Router()

routes
  .post('/shelters', SheltersController.createShelter)
  .get('/shelters', SheltersController.getAllShelters)
  .get('/shelters/:id', SheltersController.getOneShelter)
  .put('/shelters/:id', SheltersController.updateManyShelterProperties)
  .patch('/shelters/:id', SheltersController.updateOneShelterProperty)

module.exports = routes