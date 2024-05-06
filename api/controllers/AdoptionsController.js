const { AdoptionService } = require('../services')
const Controller = require('./Controller')

const adoptionService = new AdoptionService()

class AdoptionsController extends Controller {
  constructor() {
    super(adoptionService)
  }
}

module.exports = AdoptionsController
