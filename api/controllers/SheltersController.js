const database = require('../models')

class SheltersController {
  static async createShelter(req, res) {
    const newShelter = req.body
    try {
      if (Object.keys(newShelter).length === 0) {
        throw new Error('empty request body')
      }

      const newShelterCreated = await database.Shelter.create(newShelter)
      return res.status(200).json(newShelterCreated)
    } catch (err) {
      if (err.message === 'empty request body') {
        return res.status(422).json({ error: err.message })
      }
      return res.status(500).json({ error: err.message })
    }
  }

  static async getAllShelters(req, res) {
    try {
      const shelters = await database.Shelter.findAll()
      return res.status(200).json(shelters)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  static async getOneShelter(req, res) {
    const { id } = req.params
    try {
      const shelter = await database.Shelter.findByPk(Number(id))

      if (shelter === null) {
        throw new Error('Shelter not found')
      }

      return res.status(200).json(shelter)
    } catch (err) {
      if (err.message === 'Shelter not found') {
        return res.status(404).json({ error: err.message })
      }
      return res.status(500).json({ error: err.message })
    }
  }

  static async updateManyShelterProperties(req, res) {
    const { id } = req.params
    const newInfo = req.body
    try {
      const updated = await database.Shelter.update(newInfo, { where: { id: Number(id) } })

      if (updated[0]) {
        const shelterUpdated = await database.Shelter.findByPk(Number(id))
        return res.status(200).json({ message: 'shelter updated', content: shelterUpdated })
      }

      return res.status(204).json()
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  static async updateOneShelterProperty(req, res) {
    const { id } = req.params
    const newInfo = req.body

    try {
      /* Checks if more than one property was passed in the body */
      if (Object.keys(newInfo).length > 1) {
        throw new Error('only one property can be updated at a time')
      }

      const updated = await database.Shelter.update(newInfo, { where: { id: Number(id) } })

      if (updated[0]) {
        const shelterUpdated = await database.Shelter.findByPk(Number(id))
        return res.status(200).json({ message: 'shelter updated', content: shelterUpdated })

      }

    } catch (err) {
      if (err.message === 'only one property can be updated at a time') {
        return res.status(422).json({ error: err.message })
      }
      return res.status(500).json({ error: err.message })
    }
  }

  static async deleteShelter(req, res) {
    const { id } = req.params
    try {
      await database.Shelter.destroy({ where: { id: Number(id) } })
      return res.status(200).json({ message: `Shelter with id:${id} was successfully deleted` })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }
}

module.exports = SheltersController