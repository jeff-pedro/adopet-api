const express = require('express')
const routes = express.Router()
const AuthController = require('../controllers/AuthController')

routes
  .post('/login', AuthController.login)

module.exports = routes
