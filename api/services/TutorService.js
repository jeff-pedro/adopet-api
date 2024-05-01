const dataSource = require('../models')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')

const Services = require('./Services.js')

class TutorService extends Services {
  constructor() {
    super('User')
  }

  async createRecord(dto) {
    // gera um sal aleatório
    const salt = await bcrypt.genSalt()

    // gera uma senha hasheada utilizando o sal gerado
    const hashedPassword = await bcrypt.hash(dto.password, salt)
      
    // atualiza senha e armazena o sal do usuário
    dto.password = hashedPassword
    dto.salt = salt.toString('hex')

    return dataSource[this.model].create({
      id: uuidv4(),
      ...dto
    })
  }








  async delete(id) {
    try {
      const tutorDeleted = await database.User.destroy({ where: { id } })

      return tutorDeleted
    } catch (err) {
      throw new Error(err)
    }
  }

}

module.exports = TutorService
