const { ShelterService } = require('../services')

const shelterService = new ShelterService()

class SheltersController {
  static async createShelter(req, res) {
    const data = req.body
    try {
      if (Object.keys(data).length === 0) {
        throw new Error('empty request body')
      }

      const newShelter = await shelterService.create(data)

      return res.status(200).json(newShelter)
    } catch (err) {
      if (err.message === 'empty request body') {
        return res.status(422).json({ error: err.message })
      }
      return res.status(500).json({ error: err.message })
    }
  }

  static async getAllShelters(req, res, next) {
    try {
      const shelterResult = shelterService.getAll()
      req.result = shelterResult
      next()
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  static async getOneShelter(req, res) {
    const { id } = req.params
    try {
      const shelter = await shelterService.getOne(id)

      return res.status(200).json(shelter)
    } catch (err) {
      if (err.message.includes('Shelter not found')) {
        return res.status(404).json({ error: err.message })
      }
      return res.status(500).json({ error: err.message })
    }
  }

  static async updateManyShelterProperties(req, res) {
    const { id } = req.params
    const newInfo = req.body

    try {
      const shelterUpdated = await shelterService.update(id, newInfo)

      if (shelterUpdated) {
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

      const shelterUpdated = await shelterService.update(id, newInfo)

      if (shelterUpdated) {
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
      await shelterService.delete(id)
      return res.status(200).json({ message: `Shelter with id:${id} was successfully deleted` })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }
}

module.exports = SheltersController
