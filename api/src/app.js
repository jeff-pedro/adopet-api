const express = require('express')
const session = require('express-session')
const { createClient } = require('redis')
const RedisStore = require('connect-redis').default
const cors = require('cors')

const router = require('./routes')

const app = express()

app.use(express.json())
app.use(cors()) //inseri isso para  não ter conflito nas requisuições

// Configure redis client
let redisClient = createClient()

redisClient.connect()
  .then(() => {
    console.log('Connected to redis successfully.')
  })
  .catch(err => {
    console.log('Could not establish a connection with redis. ', err)
  })

// Configure redis store
let redisStore = new RedisStore({
  client: redisClient,
  prefix: 'adopet:',
})

// Configure session middleware
app.use(session({
  store: redisStore,
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  // cookie: {
  //   httpOnly: true,
  //   maxAge: 3600
  // }
}))

router(app)

app.use((req, res, next) => {
  console.log(req.session)
  next()
})

// Error handler middleware
app.use((err, req, res, next) => {
  if(err) {
    res.json({ error: err })
  }
})

module.exports = app
