const { Router } = require('express')
const PetsController = require('../controllers/PetsController.js')
const AdoptionsController = require('../controllers/AdoptionsController.js')
const routes = Router()

routes
  .post('/pets', PetsController.createPet)
  .post('/pets/:id/adoption', AdoptionsController.createAdoption)
  .get('/pets', PetsController.getAllPets)
  .get('/pets/:id', PetsController.getOnePet)
  .put('/pets/:id', PetsController.updateManyPetProperties)
  .patch('/pets/:id', PetsController.updateOnePetProperty)
  .delete('/pets/:id', PetsController.deletePet)

module.exports = routes