const bcrypt = require('bcrypt')

const database = require('../models') 

async function authenticate(req, res, next) {
  const { email, password } = req.body

  const user = await database.User.findOne({ where: { email } })

  const hashedPassword = user.password

  const matched = await bcrypt.compare(password, hashedPassword)

  if (matched) {
    req.user = user
    return res.status(200).send({ message: 'User logged' })
  } else {
    return res.status(403).json({ message: 'Login or password are incorrect.'})
  }
}

module.exports = authenticate