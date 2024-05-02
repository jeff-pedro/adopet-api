const { ShelterService } = require('../services')
const Controller = require('./Controller')

const shelterService = new ShelterService()

class SheltersController extends Controller {
  constructor() {
    super(shelterService)
  }
}

module.exports = SheltersController
