const { PetService } = require('../services')
const Controller = require('./Controller.js')

const petService = new PetService()

class PetsController extends Controller {
  constructor() {
    super(petService)
  }

  async adopt(req, res) {
    const { id } = req.params
    const { tutor_id, date } = req.body

    const adoptionData = {
      pet_id: id,
      tutor_id: tutor_id,
      date: date ?? new Date()
    }

    try {
      const adoption = await petService.newAdoption(adoptionData)

      return res.status(200).json(adoption)
    } catch (err) {
      console.log(err)
      return res.status(400).json({ error: err.message })
    }
  }

  async cancelAdoption (req, res) {
    const { id } = req.params

    try {
      const isCanceled = await petService.removeAdoption(id)
      
      if (!isCanceled) {
        return res.status(422).json({ message: `adoption with id:${id} was not cancel` }) 
      }

      return res.status(200).json({ message: `adoption with id:${id} was canceled` })

    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }

  //   /* Body validation */
  //   const newPet = {
  //     name: body.name,
  //     birthday: new Date(body.birthday), // RFC2822
  //     size: body.size,
  //     personality: body.personality,
  //     species: body.species,
  //     status: body.status,
  //     profilePictureUrl: body.profilePictureUrl || null,
  //     shelter_id: Number(body.shelter_id) || null
  //   }
}

module.exports = PetsController
