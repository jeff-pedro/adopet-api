const { PetService } = require('../services')
const Controller = require('./Controller.js')

const petService = new PetService()

class PetsController extends Controller {
  constructor() {
    super(petService)
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
