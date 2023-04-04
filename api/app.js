const express = require('express')
const router = require('./routes')

const app = express()

/* call routes */
router(app)

module.exports = app
