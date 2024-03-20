const { AdoptionService } = require('../services')

const adoptionService = new AdoptionService()

class AdoptionsController {
  static async createAdoption(req, res) {
    const { body } = req
    const petId = req.params.id

    // validation
    const adoptionData = {
      animal: Number(petId),
      tutor: Number(body.tutor),
      date: body.date ?? new Date()
    }

    try {
      const adoption = await adoptionService.create(adoptionData, petId)

      return res.status(200).json({ adoption })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }

  static async deleteAdoption(req, res) {
    const petId = req.params.id
    /*  
        Only "Shelters" could delete adoptions! 
        TODO: implement authentication and rules for this 
    */
    try {
      await adoptionService.delete(petId)
      return res.status(200).json({ message: `Adoption with id:${petId} was deleted` })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}

module.exports = AdoptionsController
