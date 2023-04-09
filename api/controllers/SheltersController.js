const database = require('../models')

class SheltersController {
  static async createShelter(req, res) {
    const newShelter = req.body
    try {
      const newShelterCreated = await database.Shelter.create(newShelter)
      return res.status(200).json(newShelterCreated)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  static async getAllShelters(req, res) {
    try {

      const shelters = await database.Shelter.findAll()

      if (!shelters.length) {
        return res.status(400).json({ message: 'Shelters not found' })
      }

      return res.status(200).json(shelters)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  static async getOneShelter(req, res) {
    const { id } = req.params
    try {
      const shelter = await database.Shelter.findByPk(Number(id))

      if (!shelter) {
        return res.status(400).json({ message: 'Shelter not found' })
      }

      return res.status(200).json(shelter)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }
}

module.exports = SheltersController