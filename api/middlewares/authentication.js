const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('../models')

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {
    try {
      const user = await db.User.findOne({ where: { email } })

      // check user
      if (!user) {
        return done('Incorrect email or password.', null)
      }

      // vefiry password
      const passwordVerified = await bcrypt.compare(password, user.password)

      if (!passwordVerified) {
        return done('Incorrect email or password.', null)
      }

      done(null, user)
    } catch (err) {
      done(err, null)
    }
  })
)

passport.serializeUser((user, done) => {
  process.nextTick(() => {
    done(null, { id: user.id })
  })
})

passport.deserializeUser((user, done) => {
  process.nextTick(() => {
    done(null, user)
  })
})

function authenticate(req, res, next) {
  passport.authenticate('local', (err, user, info, status) => {
    if (err) { return res.status(403).json({ message: err }) }
    return res.status(200).json({ id: user.id, email: user.email })
  })(req, res, next)
}

module.exports = authenticate
