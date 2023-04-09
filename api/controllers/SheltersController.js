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
}

module.exports = SheltersController