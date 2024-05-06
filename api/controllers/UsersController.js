const { UserService } = require('../services/index.js')
const Controller = require('./Controller.js')

const userService = new UserService()

class UsersController extends Controller {
  constructor() {
    super(userService)
  }
}

module.exports = UsersController
