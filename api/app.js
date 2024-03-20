const express = require('express')
// session
// const session = require('express-session')
// const { createClient } = require('redis')
// const connectRedis = require('connect-redis')
// const passport = require('passport')

const cors = require('cors')

const router = require('./routes')

const app = express()

app.use(express.json())
app.use(cors()) //inseri isso para não ter conflito nas requisições

// const RedisStore = connectRedis.default

// Configure redis client
// const redisClient = createClient()

// redisClient.connect()
//   .then(() => {
//     console.log('Connected to redis successfully.')
//   })
//   .catch(err => {
//     console.log('Could not establish a connection with redis. ', err)
//   })

// Configure redis store
// const redisStore = new RedisStore({
//   client: redisClient,
//   prefix: 'adopet:',
// })

// Configure session middleware
// app.use(session({
//   store: new RedisStore({
//     client: redisClient,
//     prefix: 'adopet:',
//   }),
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: false,
//     httpOnly: false,
//     maxAge: 1000 * 30 //1000 * 60 * 10
//   }
// }))

// Authenticate session
// app.use('/api/login/', passport.session())

router(app)

// Error handler middleware
app.use((err, req, res, next) => {
  if (err) {
    res.json({ error: err })
  }
})

module.exports = app
