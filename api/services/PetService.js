const database = require('../models')
const Services = require('./Services')
class PetService extends Services {
  constructor() {
    super('Pet')
  }
  // async create(dto) {

  //   try {
  //     const newPet = await database.Pet.create(dto)

  //     return newPet
  //   } catch (err) {
  //     throw new Error('pet was not created.')
  //   }
  // }

  // getAll() {
  //   try {
  //     const petsResult = database.Pet

  //     return petsResult
  //   } catch (err) {
  //     throw new Error(err)
  //   }
  // }

  // async getOne(id) {
  //   try {
  //     const pet = await database.Pet.findByPk(Number(id))

  //     if (pet === null) {
  //       throw new Error('Pet not found')
  //     }

  //     return pet
  //   } catch (err) {
  //     throw new Error(err)
  //   }
  // }

  // async update(id, dto) {
  //   try {
  //     const updated = await database.Pet.update(dto, { where: { id: Number(id) } })

  //     if (updated[0]) {
  //       const pet = await database.Pet.findOne({ where: { id: Number(id) } })

  //       return pet
  //     }

  //     return updated[0]
  //   } catch (err) {
  //     throw new Error(err)
  //   }
  // }

  // async delete(id) {
  //   try {
  //     const petDeleted = await database.Pet.destroy({ where: { id: Number(id) } })

  //     if (!petDeleted) {
  //       throw new Error(`Pet with id:${id} not found`)
  //     }

  //     return petDeleted
  //   } catch (err) {
  //     throw new Error(err)
  //   }
  // }
}

module.exports = PetService
