const { PetService } = require('../services')

const petService = new PetService()

class PetsController {
  static async createPet(req, res) {
    const { body } = req

    // validation
    const newPet = {
      name: body.name,
      birthday: new Date(body.birthday), // RFC2822
      size: body.size,
      personality: body.personality,
      species: body.species,
      status: body.status,
      profilePictureUrl: body.profilePictureUrl || null,
      shelter_id: Number(body.shelter_id) || null
    }

    try {
      if (Object.keys(body).length === 0) {
        throw new Error('empty request body')
      }

      const newPetCreated = await petService.create(newPet)

      return res.status(200).json(newPetCreated)
    } catch (err) {
      if (err.message.includes('Validation error')) {
        return res.status(422).json({ error: err.errors[0].message })
      }

      if (err.message.includes('notNull Violation')) {
        return res.status(422).json({ error: err.errors[0].message })
      }

      if (err.message === 'empty request body') {
        return res.status(422).json({ error: err.message })
      }

      return res.status(500).json({ error: err.message })
    }
  }

  static async getAllPets(req, res, next) {
    try {
      const petsResult = petService.getAll()
      req.result = petsResult
      next()
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }

  static async getOnePet(req, res) {
    const { id } = req.params
    try {
      const pet = await petService.getOne(id)

      return res.status(200).json(pet)
    } catch (err) {
      if (err.message.includes('Pet not found')) {
        return res.status(404).json({ error: err.message })
      }

      return res.status(500).json({ error: err.message })
    }
  }

  static async updateManyPetProperties(req, res) {
    const { id } = req.params
    const newInfo = req.body

    try {
      const petUpdated = await petService.update(id, newInfo)

      if (petUpdated) {
        return res.status(200).json({ message: 'pet updated', content: petUpdated })
      }

      return res.status(204).json()
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }

  static async updateOnePetProperty(req, res) {
    const { id } = req.params
    const newInfo = req.body

    try {
      /* Checks if more than one property was passed in the body */
      if (Object.keys(newInfo).length > 1) {
        throw new Error('one property can be updated at a time')
      }

      const petUpdated = await petService.update(id, newInfo)

      if (petUpdated) {
        return res.status(200).json({ message: 'pet updated', content: petUpdated })
      }

      return res.status(204).json()
    } catch (err) {
      if (err.message === 'one property can be updated at a time') {
        return res.status(422).json({ error: err.message })
      }

      return res.status(500).json({ error: err.message })
    }
  }

  static async deletePet(req, res) {
    const { id } = req.params
    try {
      await petService.delete(id)

      return res.status(200).json({ message: `Pet with id:${id} was successfully deleted` })
    } catch (err) {
      if (err.message.includes(`Pet with id:${id} not found`)) {
        return res.status(400).json({ error: err.message })
      }
      return res.status(500).json({ error: err.message })
    }
  }
}

module.exports = PetsController