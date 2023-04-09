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

  static async updateManyShelterProperties(req, res) {
    const { id } = req.params
    const newInfo = req.body
    try {
      await database.Shelter.update(newInfo, { where: { id: Number(id) } })
      const shelterUpdated = await database.Shelter.findByPk(Number(id))
      return res.status(200).json(shelterUpdated)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  static async updateOneShelterProperty(req, res) {
    const { id } = req.params
    const newInfo = req.body

    console.log(newInfo)

    /* Checks if more than one property was passed in the body */
    if (Object.keys(newInfo).length > 1) {
      return res.status(200).json({ error: 'only one property is accepted to be updated with the PATCH method' })
    }

    try {
      await database.Shelter.update(newInfo, { where: Number(id) })
      const shelterUpdated = await database.Shelter.findByPk(Number(id))
      return res.status(200).json(shelterUpdated)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  static async deleteShelter(req, res) {
    const { id } = req.params
    try {
      const shelterDeleted = await database.Shelter.destroy({ where: { id: Number(id) } })

      if (!shelterDeleted.length) {
        return res.status(400).json({ error: `Shelter with id:${id} not found`})
      }

      return res.status(200).json({ message: `Shelter with id:${id} was successfully deleted`})
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }
}

module.exports = SheltersController