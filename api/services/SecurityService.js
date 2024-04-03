const Sequelize = require('sequelize')
const database = require('../models')

class SecurityService {
  async addPermissionsToProfile({ profile: profileName, permissions: permissionsList }) {
    const profile = await database.Profile.findOne({
      include: [
        {
          model: database.Permission,
          as: 'profilePermissions', 
          attributes: ['id', 'name', 'description'],
        }
      ],
      where: { 
        name: profileName
      }
    })
  
    if (!profile) {
      throw new Error('No profile found.')
    }


    const permissions = await database.Permission.findAll({
      attributes: ['id'],
      where: {
        name: {
          [Sequelize.Op.in]: permissionsList
        }
      }
    })
      
    const permissionsIds = permissions.map((permission) => permission.id)

    
    await profile.removeProfilePermissions(profile.profilePermissions)
    await profile.addProfilePermissions(permissionsIds)


    const freshProfile = await database.Profile.findOne({
      include: [
        {
          model: database.Permission,
          as: 'profilePermissions',
          attributes: ['name', 'description'],
          through: {
            attributes: []
          }
        }
      ],
      where: {
        name: profileName
      }
    })

    return freshProfile
  }
}

module.exports = SecurityService
