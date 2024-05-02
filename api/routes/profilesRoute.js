const routes = require('express').Router()
const ProfilesController = require('../controllers/ProfilesController.js')
const pagination = require('../middlewares/pagination.js')

const profilesController = new ProfilesController()

routes
  .post('/profiles', (req, res, next) => profilesController.createNew(req, res, next))
  .get('/profiles', (req, res, next) => profilesController.getAll(req, res, next), pagination)
  .get('/profiles/:id', (req, res, next) => profilesController.getById(req, res, next))
  .put('/profiles/:id', (req, res, next) => profilesController.updateMany(req, res, next))
  .delete('/profiles/:id', (req, res, next) => profilesController.delete(req, res, next))

module.exports = routes
