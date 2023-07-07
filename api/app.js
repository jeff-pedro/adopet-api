const express = require('express')

const router = require('./routes')
const pagination = require('./middlewares/pagination.js')
const auth = require('./middlewares/authentication.js')

const app = express()

app.use(express.json())

app.use('/login', auth)
router(app)

app.use(pagination)

module.exports = app
