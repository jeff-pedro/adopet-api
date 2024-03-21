const { Router } = require('express')
const SheltersController = require('../controllers/SheltersController.js')
const pagination = require('../middlewares/pagination.js')
const authorization = require('../middlewares/authorization.js')

const routes = Router()

routes.use(authorization)

routes
  .post('/shelters', SheltersController.createShelter)
  .get('/shelters', SheltersController.getAllShelters, pagination)
  .get('/shelters/:id', SheltersController.getOneShelter)
  .put('/shelters/:id', SheltersController.updateManyShelterProperties)
  .patch('/shelters/:id', SheltersController.updateOneShelterProperty)
  .delete('/shelters/:id', SheltersController.deleteShelter)

module.exports = routes