const { ProfileService } = require('../services')
const Controller = require('./Controller')

const profileService = new ProfileService()

class ProfilesController extends Controller {
  constructor() {
    super(profileService)
  }
}

module.exports = ProfilesController