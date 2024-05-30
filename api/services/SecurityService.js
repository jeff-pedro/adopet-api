const Sequelize = require('sequelize')
const dataSource = require('../database/models')
const Api404Error = require('../errors/api404Error.js')

class SecurityService {
  async addPermissionsToProfile({ profile: profileName, permissions: permissionsList }) {
    const profile = await dataSource.Profile.findOne({
      include: [
        {
          model: dataSource.Permission,
          as: 'profilePermissions', 
          attributes: ['id', 'name', 'description'],
        }
      ],
      where: { 
        name: profileName
      }
    })

    if (!profile) {
      throw new Api404Error('No profile found.')
    }


    const permissions = await dataSource.Permission.findAll({
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


    const freshProfile = await dataSource.Profile.findOne({
      include: [
        {
          model: dataSource.Permission,
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
      const profilesPermissions = await dataSource.Profile.findAll({
        attributes: ['name'],
        include: [{
          model: dataSource.Permission,
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
      const profilePermissions = await dataSource.Profile.findOne({
        attributes: ['name'],
        include: [{
          model: dataSource.Permission,
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
    
    const user = await dataSource.User.findOne({
      include: [
        {
          model: dataSource.Profile,
          as: 'userProfile',
          attributes: ['id', 'name', 'description']
        }
      ],
      where: {
        id: userId
      }
    })

    if (!user) {
      throw new Api404Error('No user found.')
    }

    const profile = await dataSource.Profile.findOne({
      where: {
        id: profileId
      }
    })

    if (!profile) {
      throw new Api404Error('No profile found.')
    }

    try {
      await user.addUserProfile(profile.id)

      const freshUser = await dataSource.User.findOne({
        include: [
          {
            model: dataSource.Profile,
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
