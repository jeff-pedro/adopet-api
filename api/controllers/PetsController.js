const { PetService } = require('../services')
const Controller = require('./Controller.js')

const petService = new PetService()

class PetsController extends Controller {
  constructor() {
    super(petService)
  }

  async adopt(req, res, next) {
    const pet_id = req.params.id
    const { tutor_id, date } = req.body

    const adoptionData = {
      pet_id,
      tutor_id,
      date: date ?? new Date()
    }

    try {
      const adoption = await petService.newAdoption(adoptionData)

      return res.status(200).json(adoption)
    } catch (err) {
      return next(err)
    }
  }

  async cancelAdoption (req, res, next) {
    const { id } = req.params
    try {
      await petService.removeAdoption(id)
      return res.status(200).json({ message: `adoption with id:${id} was canceled` })
    } catch (err) {
      return next(err)
    }
  }
}

module.exports = PetsController
