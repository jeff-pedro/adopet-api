const express = require('express')
const routes = express.Router()
const AuthController = require('../controllers/AuthController.js')

routes
  .post('/login', AuthController.login)
  .post('/register', AuthController.registerUser)

module.exports = routes
