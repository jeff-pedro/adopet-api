const database = require('../models')

class AdoptionsController {
  static async createAdoption(req, res) {
    const { body } = req
    const petId = req.params.id

    const adoptionData = {
      animal: Number(petId),
      tutor: Number(body.tutor),
      date: body.date || new Date()
    }

    try {
      const adoption = await database.Adoption.create(adoptionData)
      await database.Pet.update({ status: 'Adopted' }, { where: { id: Number(petId) } })
      return res.status(200).json({
        adoption: adoption
      })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  static async deleteAdoption(req, res) {
    const petId = req.params.id
    /*  
        Only "Shelters" could delete adoptions! 
        TODO: implement authentication and rules for this 
    */
    try {
      await database.Adoption.destroy({ where: { animal: Number(petId) } })
      return res.status(200).json({ message: `Adoption with id:${petId} was deleted` })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }
}

module.exports = AdoptionsController