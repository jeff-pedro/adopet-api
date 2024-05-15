const { compare } = require('bcrypt')
const { sign } = require('jsonwebtoken')

const database = require('../database/models')
const secret = process.env.JWT_SECRET

class LoginService {
  async login(dto) {
    try {
      const user = await database.User.findOne({
        attributes: ['id', 'email', 'password'],
        where: {
          email: dto.email
        }
      })

      if (!user) {
        throw new Error('This user not exist.')
      }

      const passwordsMatch = await compare(dto.password, user.password)

      if (!passwordsMatch) {
        throw new Error('Invalid email or password.')
      }

      const token = sign({
        id: user.id,
        email: user.email
      }, secret, {
        expiresIn: 60 * 60 // 1h
      })

      return {
        user: {
          id: user.id,
          email: user.email
        },
        token
      }
    } catch (err) {
      throw new Error(err.message)
    }
  }
}

module.exports = LoginService
