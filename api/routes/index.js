const express = require('express')
const tutors = require('./tutorsRoute')
const shelters = require('./sheltersRoute')
const pets = require('./petsRoute')

module.exports = (app) => {
  /* GET home page. */
  app.get('/', function (req, res) {
    res.status(200).json({ message: 'Welcome to Adopet API 🐾' })
  })

  app.use(
    express.json(),
    tutors,
    shelters,
    pets
  )
}
