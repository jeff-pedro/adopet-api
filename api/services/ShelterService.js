const database = require('../models')

class ShelterService {
  async create(dto) {

    try {
      const newShelter = await database.Shelter.create(dto)

      return newShelter
    } catch (err) {
      throw new Error('shelter was not created.')
    }
  }

  getAll() {
    try {
      const shelterResult = database.Shelter

      return shelterResult
    } catch (err) {
      throw new Error(err)
    }
  }

  async getOne(id) {
    try {
      const shelter = await database.Shelter.findByPk(Number(id))

      if (shelter === null) {
        throw new Error('Shelter not found')
      }

      return shelter
    } catch (err) {
      throw new Error(err)
    }
  }

  async update(id, dto) {
    try {
      const updated = await database.Shelter.update(dto, { where: { id: Number(id) } })

      if (updated[0]) {
        const shelter = await database.Shelter.findOne({ where: { id: Number(id) } })

        return shelter
      }

      return updated[0]
    } catch (err) {
      throw new Error(err)
    }
  }

  async delete(id) {
    try {
      const shelterDeleted = await database.Shelter.destroy({ where: { id: Number(id) } })

      if (!shelterDeleted) {
        throw new Error(`Shelter with id:${id} not found`)
      }

      return shelterDeleted
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = ShelterService
