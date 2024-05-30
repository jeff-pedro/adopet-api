const { compare } = require('bcrypt')
const { sign } = require('jsonwebtoken')
const { v4: uuid } = require('uuid')
const bcrypt = require('bcrypt')
require('dotenv').config() 

const Services = require('./Services.js')
const ValidationError = require('../errors/validationError.js') 
const Api404Error = require('../errors/api404Error.js') 
const UnauthorizedError = require('../errors/unauthorizedError.js') 
const InternalServerError = require('../errors/internalServerError.js') 
const InvalidArgumentError = require('../errors/invalidArgumentError.js')

class AuthService extends Services {
  constructor() {
    super('User')
  }

  async login(dto) {
    const secret = process.env.JWT_SECRET
    
    const user = await super.getOneRecord({
      attributes: ['id', 'email', 'password'],
      where: {
        email: dto.email
      }
    })

    if (!user) {
      throw new Api404Error('This user not exist.')
    }

    const passwordsMatch = await compare(dto.password, user.password)

    if (!passwordsMatch) {
      throw new UnauthorizedError('Invalid email or password.')
    }

    if (!secret) {
      throw new InternalServerError('Error creating a token: secret must have a value')
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
  }

  async register(dto) {
    if (Object.keys(dto).length === 0) {
      throw new InvalidArgumentError('empty request body')
    }

    if (!dto.password) {
      throw new ValidationError('password field is required')
    }
    
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(dto.password, salt)

    dto.password = hashedPassword
    dto.salt = salt.toString('hex')
    
    return super.createRecord({
      id: uuid(),
      ...dto
    })
  } 
}

module.exports = AuthService
