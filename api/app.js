const express = require('express')
const cors = require('cors')
require('dotenv').config()

const router = require('./routes')
const app = express()

app.use(express.json())
app.use(cors())

router(app)

// Error handler middleware
app.use((err, req, res, next) => {
  if (err) {
    res.json({ error: err })
  }
})

module.exports = app
