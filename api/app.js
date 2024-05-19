const express = require('express')
const cors = require('cors')
require('dotenv').config()

const { logError, returnError } = require('./middlewares/errorHandler.js')
const router = require('./routes')
const app = express()

app.use(express.json())
app.use(cors())

router(app)

// Error handler middleware
app.use(logError)
app.use(returnError)

module.exports = app
