const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const dataSource = require('../database/models')

const Services = require('./Services.js')
const BadRequestError = require('../errors/badRequestError.js')
const ValidationError = require('../errors/validationError.js')

class UserService extends Services {
  constructor() {
    super('User')
  }

  async createRecord(dto) {
    if (Object.keys(dto).length === 0) {
      throw new BadRequestError('empty request body')
    }

    if (!dto.password) {
      throw new ValidationError('password is required')
    }

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(dto.password, salt)

    // atualiza senha e armazena o sal do usuário
    dto.password = hashedPassword
    dto.salt = salt.toString('hex')

    return dataSource[this.model].create({
      id: uuidv4(),
      ...dto
    })
  }
}

module.exports = UserService
