const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authentication.js')

router
  .post('/login', authenticate)

module.exports = router
