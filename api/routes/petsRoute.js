const { Router } = require('express')
const PetsController = require('../controllers/PetsController.js')
const AdoptionsController = require('../controllers/AdoptionsController.js')
const routes = Router()
const pagination = require('../middlewares/pagination.js')

routes
  .post('/pets', PetsController.createPet)
  .post('/pets/:id/adoption', AdoptionsController.createAdoption)
  .get('/pets', PetsController.getAllPets, pagination)
  .get('/pets/:id', PetsController.getOnePet)
  .put('/pets/:id', PetsController.updateManyPetProperties)
  .patch('/pets/:id', PetsController.updateOnePetProperty)
  .delete('/pets/:id', PetsController.deletePet)
  .delete('/pets/:id/adoption/cancel', AdoptionsController.deleteAdoption)

module.exports = routes