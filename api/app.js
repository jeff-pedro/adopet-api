const express = require('express')
const cors = require('cors')
require('dotenv').config()

const { 
  logError, 
  logErrorMiddleware,
  returnError, 
  isOperational 
} = require('./middlewares/errorHandler.js')

const router = require('./routes')

const app = express()

app.use(express.json())
app.use(cors())

router(app)

// Error handler middleware
app.use(logErrorMiddleware)
app.use(returnError)

process.on('uncaughtException', (err) => {
  logError(err)

  if (!isOperational(err)) {
    process.exit(1)
  }
})

module.exports = app
