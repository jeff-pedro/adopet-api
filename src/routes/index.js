const express = require('express')
const tutors = require('./tutorRoutes')

module.exports = (app) => {
    /* GET home page. */
    app.get('/', function (req, res) {
        res.status(200).json({ message: 'Welcome to Adopet API 🐾' })
    })

    app.use(
        express.json(),
        tutors,
    )
}
