var { Router } = require('express')
var router = Router()

/* GET users listing. */
router
    .get('/user', function (req, res, next) {
        res.send('respond with a resource')
    })

module.exports = router
