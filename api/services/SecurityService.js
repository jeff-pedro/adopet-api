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

  async getProfilePermissions() {
    try {
      const profilesPermissions = await database.Profile.findAll({
        attributes: ['name'],
        include: [{
          model: database.Permission,
          as: 'profilePermissions',
          attributes: ['name', 'description'],
          through: {
            attributes: []
          }
        }]
      })

      return profilesPermissions
    } catch (err) {
      throw new Error(err)
    }
  }

  async getProfilePermissionsById(id) {
    try {
      const profilePermissions = await database.Profile.findOne({
        attributes: ['name'],
        include: [{
          model: database.Permission,
          as: 'profilePermissions',
          attributes: ['name', 'description'],
          through: {
            attributes: []
          }
        }],
        where: { id }
      })

      return profilePermissions
    } catch (err) {
      throw new Error(err)
    }
  }

  async registerAcl(dto) {
    const { userId, profileId } = dto
    
    const user = await database.User.findOne({
      include: [
        {
          model: database.Profile,
          as: 'userProfile',
          attributes: ['id', 'name', 'description']
        }
      ],
      where: {
        id: userId
      }
    })

    if (!user) {
      throw new Error('No user found.')
    }

    const profile = await database.Profile.findOne({
      where: {
        id: profileId
      }
    })

    if (!profile) {
      throw new Error('No profile found.')
    }

    try {
      await user.addUserProfile(profile.id)

      const freshUser = await database.User.findOne({
        include: [
          {
            model: database.Profile,
            as: 'userProfile',
            attributes: ['name', 'description'],
            through: { attributes: [] }
          }
        ],
        where:
          { id: userId }
      })
      
      return freshUser
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = SecurityService
