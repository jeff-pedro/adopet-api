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
      res.status(422).json({ error: err.message })
    }
  }

  static async getAllProfilePermissions(req, res) {
    try {
      const profilePermissions = await securityService.getProfilePermissions()
      res.status(200).json(profilePermissions)
    } catch (err) {
      res.status(422).json({ error: err.message })
    }
  }

  static async getOneProfilePermissions(req, res) {
    const { id } = req.params

    try {
      const profilePermissions = await securityService.getProfilePermissionsById(id)
      res.status(200).json(profilePermissions)
    } catch (err) {
      res.status(422).json({ error: err.message })
    }
  }

  static async registerAcl(req, res) {
    const { userId, profileId } = req.body

    try {
      const acl = await securityService.registerAcl({ userId, profileId })
      res.status(201).json(acl)
    } catch (err) {
      res.status(422).json({ error: err.message })
    }
  }
}

module.exports = SecurityController
