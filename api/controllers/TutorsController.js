const { TutorService } = require('../services')
const Controller = require('./Controller.js')

const tutorService = new TutorService()

class TurtorsController extends Controller {
  constructor() {
    super(tutorService)
  }
}

module.exports = TurtorsController
