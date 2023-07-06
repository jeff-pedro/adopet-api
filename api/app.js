const express = require('express')

const router = require('./routes')
const pagination = require('./middlewares/pagination.js')

const app = express()

app.use(express.json())

router(app)

app.use(pagination)

module.exports = app
