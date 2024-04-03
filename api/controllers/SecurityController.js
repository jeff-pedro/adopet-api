const { SecurityService } = require('../services')

const securityService = new SecurityService()

class SecurityController {
  static async addProfilePermission(req, res) {
    const { profile, permissions } = req.body
    
    try {
      const profilePermissions = await securityService
        .addPermissionsToProfile({
          profile, 
          permissions
        })

      res.status(201).json(profilePermissions)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}

module.exports = SecurityController
