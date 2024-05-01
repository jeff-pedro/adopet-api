const { TutorService } = require('../services')
const Controller = require('./Controller.js')

const tutorService = new TutorService()

class TurtorsController extends Controller {
  constructor() {
    super(tutorService)
  }

  static async updateOneTutorProperty(req, res) {
    const { id } = req.params
    const newInfo = req.body

    try {
      /* Checks if more than one property was passed in the body */
      if (Object.keys(newInfo).length > 1) {
        throw new Error('only one property can be updated at a time')
      }

      const tutorUpdated = await tutorService.update(id, newInfo)

      if (tutorUpdated) {
        return res.status(200).json({ message: 'tutor updated', content: tutorUpdated })
      }

      return res.status(204).json()
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
      const tutorDeleted = await tutorService.delete(id)

      if (!tutorDeleted) {
        return res.status(200).json({ message: `Tutor with id:${id} was NOT deleted` })
      }

      return res.status(200).json({ message: `Tutor with id:${id} was deleted` })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}

module.exports = TurtorsController