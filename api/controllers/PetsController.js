const database = require('../models')

class PetsController {
  static async createPet(req, res) {
    const newPet = req.body

    // parse object to Date format (RFC2822)
    newPet.birthday = new Date(newPet.birthday)

    try {
      const newPetCreated = await database.Pet.create(newPet)
      return res.status(200).json(newPetCreated)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  static async getAllPets(req, res) {
    try {

      const pets = await database.Pet.findAll()

      if (!pets.length) {
        return res.status(400).json({ message: 'Pets not found' })
      }

      return res.status(200).json(pets)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  static async getOnePet(req, res) {
    const { id } = req.params
    try {
      const pet = await database.Pet.findByPk(Number(id))

      if (!pet) {
        return res.status(400).json({ message: 'Pet not found' })
      }

      return res.status(200).json(pet)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  static async updateManyPetProperties(req, res) {
    const { id } = req.params
    const newInfo = req.body
    try {
      await database.Pet.update(newInfo, { where: { id: Number(id) } })
      const petUpdated = await database.Pet.findByPk(Number(id))

      if (!petUpdated) {
        return res.status(400).json({ error: `Pet with id:${id} not found` })
      }

      return res.status(200).json(petUpdated)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  static async updateOnePetProperty(req, res) {
    const { id } = req.params
    const newInfo = req.body

    console.log(newInfo)

    /* Checks if more than one property was passed in the body */
    if (Object.keys(newInfo).length > 1) {
      return res.status(200).json({ error: 'only one property is accepted to be updated with the PATCH method' })
    }

    try {
      await database.Pet.update(newInfo, { where: { id: Number(id) } })
      const petUpdated = await database.Pet.findByPk(Number(id))
      return res.status(200).json(petUpdated)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  static async deletePet(req, res) {
    const { id } = req.params
    try {
      const petDeleted = await database.Pet.destroy({ where: { id: Number(id) } })

      if (!petDeleted) {
        return res.status(400).json({ error: `Pet with id:${id} not found` })
      }

      return res.status(200).json({ message: `Pet with id:${id} was successfully deleted` })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }
}

module.exports = PetsController