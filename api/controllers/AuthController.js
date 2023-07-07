const bcrypt = require('bcrypt')
const database = require('../models')

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body

    const user = await database.User.findOne({ where: { email } })

    const hashedPassword = user.password

    const matched = await bcrypt.compare(password, hashedPassword)

    if (matched) {
      return res.status(200).send('user logged')
    } else {
      return res.status(403).send('user or password are incorrect!')
    }
  }
}

module.exports = AuthController
