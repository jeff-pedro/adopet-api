const { Router } = require('express')
const PetsController = require('../controllers/PetsController.js')
const AdoptionsController = require('../controllers/AdoptionsController.js')
const pagination = require('../middlewares/pagination.js')
const authorization = require('../middlewares/authorization.js')

const routes = Router()

// public endpoints
routes
  .get('/pets', PetsController.getAllPets, pagination)

// private endpoints
routes
  .post('/pets', authorization, PetsController.createPet)
  .post('/pets/:id/adoption', AdoptionsController.createAdoption)
  .get('/pets/:id', authorization, PetsController.getOnePet)
  .put('/pets/:id', authorization, PetsController.updateManyPetProperties)
  .patch('/pets/:id', authorization, PetsController.updateOnePetProperty)
  .delete('/pets/:id', authorization, PetsController.deletePet)
  .delete('/pets/:id/adoption/cancel', authorization, AdoptionsController.deleteAdoption)

module.exports = routes