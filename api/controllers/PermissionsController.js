const { PermissionService } = require('../services')
const Controller = require('./Controller')

const permissionService = new PermissionService()

class PermissionsController extends Controller {
  constructor() {
    super(permissionService)
  }
}

module.exports = PermissionsController
