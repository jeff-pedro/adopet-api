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
}

module.exports = SheltersController