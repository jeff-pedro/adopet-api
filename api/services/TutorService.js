const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const database = require('../models')

class TutorService {

  async create(dto) {
    try {
      // gera um sal aleatório
      const salt = await bcrypt.genSalt()

      // gera uma senha hasheada utilizando o sal gerado
      const hashedPassword = await bcrypt.hash(dto.password, salt)

      // atualiza senha e armazena o sal do usuário
      dto.password = hashedPassword
      dto.salt = salt.toString('hex')

      const tutor = await database.User.create({
        id: uuidv4(),
        ...dto
      })

      return tutor
    } catch (err) {
      throw new Error(err)
    }
  }

  getAll() {
    try {
      const tutor = database.User

      return tutor
    } catch (err) {
      throw new Error(err)
    }
  }

  async getById(id) {

    try {
      const tutor = await database.User.findOne({ where: { id } })

      if (tutor === null) {
        throw new Error('Tutor not found')
      }

      return tutor
    } catch (err) {
      throw new Error(err)
    }
  }

  async update(id, dto) {
    try {
      const updated = await database.User.update(dto, { where: { id } })

      if (updated[0]) {
        const tutor = await database.User.findOne({ where: { id } })

        return tutor
      }

      return updated[0]
    } catch (err) {
      throw new Error(err)
    }
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
