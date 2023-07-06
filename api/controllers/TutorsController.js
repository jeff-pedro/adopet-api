const database = require('../models')

class TurtorsController {
  static async getAllTutors(req, res, next) {
    try {
      const tutorsResult = database.User
      req.result = tutorsResult
      next()
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  static async createTutor(req, res) {
    const newTutor = req.body

    try {
      if (Object.keys(newTutor).length === 0) {
        throw new Error('empty request body')
      }

      const newTutorCreated = await database.User.create(newTutor)
      return res.status(200).json(newTutorCreated)
    } catch (err) {
      if (err.message.includes('Validation error')) {
        return res.status(400).json({ error: err.errors[0].message })
      }

      if (err.message === 'empty request body') {
        return res.status(400).json({ error: err.message })
      }

      return res.status(500).json({ error: err.message })
    }
  }

  static async getOneTutor(req, res) {
    const { id } = req.params
    try {
      const tutor = await database.User.findOne({ where: { id: Number(id) } })

      if (tutor === null) {
        throw new Error('Tutor not found')
      }

      return res.status(200).json(tutor)
    } catch (err) {
      if (err.message === 'Tutor not found') {
        return res.status(404).json({ error: err.message })
      }
      return res.status(500).json({ error: err.message })
    }
  }

  static async updateManyTutorProperties(req, res) {
    const { id } = req.params
    const newInfo = req.body

    try {
      const updated = await database.User.update(newInfo, { where: { id: Number(id) } })

      if (updated[0]) {
        const tutorUpdated = await database.User.findOne({ where: { id: Number(id) } })
        return res.status(200).json({ message: 'tutor updated', content: tutorUpdated })
      }
      
      return res.status(204).json()
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  static async updateOneTutorProperty(req, res) {
    const { id } = req.params
    const newInfo = req.body

    try {
      /* Checks if more than one property was passed in the body */
      if (Object.keys(newInfo).length > 1) {
        throw new Error('only one property can be updated at a time')
      }

      await database.User.update(newInfo, { where: { id: Number(id) } })
      const tutorUpdated = await database.User.findOne({ where: { id: Number(id) } })

      if (!tutorUpdated) {
        return res.status(200).json({ message: 'Tutor not found.' })
      }

      return res.status(200).json({ message: 'tutor updated', content: tutorUpdated })
    } catch (err) {
      if (err.message.includes('Validation error')) {
        return res.status(400).json({ error: err.errors[0].message })
      }

      if (err.message === 'only one property can be updated at a time') {
        return res.status(422).json({ error: err.message })
      }

      return res.status(500).json({ error: err.message })
    }
  }

  static async deleteTutor(req, res) {
    const { id } = req.params
    try {
      const tutorDeleted = await database.User.destroy({ where: { id: Number(id) } })

      if (!tutorDeleted) {
        return res.status(200).json({ message: `Tutor with id:${id} was NOT deleted` })
      }

      return res.status(200).json({ message: `Tutor with id:${id} was deleted` })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }
}

module.exports = TurtorsController