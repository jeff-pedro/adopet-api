const { AdoptionService } = require('../services')
const Controller = require('./Controller')

const adoptionService = new AdoptionService()

class AdoptionsController extends Controller {
  constructor() {
    super(adoptionService)
  }

  async createNew(req, res) {
    const { body } = req
    const petId = req.params.id

    // validation
    const adoptionData = {
      animal: petId,
      tutor: body.tutor,
      date: body.date ?? new Date()
    }

    try {
      const adoption = await adoptionService.createRecord(adoptionData, petId)

      return res.status(200).json({ adoption })
    } catch (err) {
      console.log(err)
      return res.status(400).json({ error: err.message })
    }
  }

  async delete(req, res) {
    const petId = req.params.id
    
    try {
      await adoptionService.deleteRecord(petId)
      return res.status(200).json({ message: `id:${petId} was deleted` })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}

module.exports = AdoptionsController
