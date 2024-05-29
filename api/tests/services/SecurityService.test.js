const { describe, beforeAll, afterEach, expect } = require('@jest/globals')
const Sequelize = require('sequelize')
const SecurityService = require('../../services/SecurityService.js')
const dataSource = require('../../database/models')
const Api404Error = require('../../errors/api404Error.js')

jest.mock('../../database/models', () => ({
  Profile: {
    findOne: jest.fn(),
    findAll: jest.fn()
  },
  Permission: {
    findAll: jest.fn()
  },
  User: {
    findOne: jest.fn()
  }
}))

describe('SecurityService', () => {
  let securityService

  beforeAll(() => {
    securityService = new SecurityService()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('addPermissionsToProfile', () => {
    it('should add permissions to profile successfully', async () => {
      const profileName = 'Admin'
      const permissionsList = ['READ', 'WRITE']
      const profile = {
        id: 'profile-id',
        name: profileName,
        description: 'description',
        profilePermissions: [],
        removeProfilePermissions: jest.fn(),
        addProfilePermissions: jest.fn()
      }
      const permissions = [{ id: 'permission-id-1' }, { id: 'permission-id-2' }]
      const freshProfile = {
        id: 'profile-id',
        name: profileName,
        description: 'description',
        profilePermissions: [
          { name: 'READ', description: 'Read permission' },
          { name: 'WRITE', description: 'Write permission' }
        ]
      }
  
      dataSource.Profile.findOne
        .mockResolvedValueOnce(profile)  // First call, finding profile by name
        .mockResolvedValueOnce(freshProfile)  // Second call, fetching fresh profile with permissions
      dataSource.Permission.findAll.mockResolvedValue(permissions)
  
      const result = await securityService.addPermissionsToProfile({ profile: profileName, permissions: permissionsList })
  
      expect(dataSource.Profile.findOne).toHaveBeenCalledWith({
        include: [
          {
            model: dataSource.Permission,
            as: 'profilePermissions',
            attributes: ['id', 'name', 'description'],
          }
        ],
        where: { name: profileName }
      })
      expect(dataSource.Permission.findAll).toHaveBeenCalledWith({
        attributes: ['id'],
        where: {
          name: {
            [Sequelize.Op.in]: permissionsList
          }
        }
      })
      expect(profile.removeProfilePermissions).toHaveBeenCalledWith(profile.profilePermissions)
      expect(profile.addProfilePermissions).toHaveBeenCalledWith(permissions.map(permission => permission.id))
      expect(result).toEqual(freshProfile)
    })

    it('should throw error if profile not found', async () => {
      const profileName = 'NonExistentProfile'
      const permissionsList = ['READ', 'WRITE']
  
      dataSource.Profile.findOne.mockResolvedValue(null)
  
      const result  = securityService.addPermissionsToProfile({ profile: profileName, permissions: permissionsList })

      await expect(result).rejects.toThrow(Api404Error)
      await expect(result).rejects.toThrowError('No profile found.')
    })
  })

  describe('getProfilePermissions', () => {
    it('should get all profiles with their permissions', async () => {
      const profilesPermissions = [
        {
          name: 'Admin',
          profilePermissions: [
            { name: 'READ', description: 'Read permission' },
            { name: 'WRITE', description: 'Write permission' }
          ]
        }
      ]

      dataSource.Profile.findAll.mockResolvedValue(profilesPermissions)

      const result = await securityService.getProfilePermissions()

      expect(dataSource.Profile.findAll).toHaveBeenCalledWith({
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
      expect(result).toEqual(profilesPermissions)
    })

    it('should throw error if findAll fails', async () => {
      dataSource.Profile.findAll.mockRejectedValue(new Error('Database error'))

      const result = securityService.getProfilePermissions()

      await expect(result).rejects.toThrow('Database error')
    })
  })

  describe('getProfilePermissionsById', () => {
    it('should get profile permissions by profile id', async () => {
      const profileId = 'profile-id'
      const profilesPermissions = {
        name: 'Admin',
        profilePermissions: [
          { name: 'READ', description: 'Read permission' },
          { name: 'WRITE', description: 'Write permission' }
        ]
      }
      dataSource.Profile.findOne.mockResolvedValue(profilesPermissions)

      const result = await securityService.getProfilePermissionsById(profileId)

      expect(dataSource.Profile.findOne).toHaveBeenCalledWith({
        attributes: ['name'],
        include: [{
          model: dataSource.Permission,
          as: 'profilePermissions',
          attributes: ['name', 'description'],
          through: {
            attributes: []
          }
        }],
        where: { id: profileId }
      })  
      expect(result).toEqual(profilesPermissions)
    })

    it('should throw error if findOne fails', async () => {
      const profileId = 'profile-id'
      dataSource.Profile.findOne.mockRejectedValue(new Error('Database error'))
  
      await expect(securityService.getProfilePermissionsById(profileId)).rejects.toThrow('Database error')
    })
  })


  describe('registerAcl', () => {
    it('should register ACL successfully', async () => {
      const dto = { userId: 'user-id', profileId: 'profile-id' }
      const user = { 
        id: dto.userId, 
        name: 'userName', 
        userProfile: [],
        addUserProfile: jest.fn() 
      }
      const profile = { id: 'profile-id' }
      const freshUser = {
        id: user.id,
        name: user.name,
        userProfile: [{ name: 'Admin', description: 'Admin profile' }]
      }

      dataSource.User.findOne
        .mockResolvedValueOnce(user) // First call, finding user by id
        .mockResolvedValueOnce(freshUser) // Second call, fetching fresh user with profiles
      dataSource.Profile.findOne.mockResolvedValue(profile)

      const result = await securityService.registerAcl(dto)

      expect(dataSource.User.findOne).toHaveBeenCalledWith({
        include: [
          {
            model: dataSource.Profile,
            as: 'userProfile',
            attributes: ['id', 'name', 'description']
          }
        ],
        where: {
          id: dto.userId
        }
      })
      expect(dataSource.Profile.findOne).toHaveBeenCalledWith({ where: { id : profile.id }})
      expect(user.addUserProfile).toHaveBeenCalledWith(profile.id)
      expect(result).toEqual(freshUser)
    })

    it('should throw error if user not found', async () => {
      const dto = { userId: 'nonexistent-user-id', profileId: 'profile-id' }

      dataSource.User.findOne.mockResolvedValue(null)

      const result = securityService.registerAcl(dto)

      await expect(result).rejects.toThrow(Api404Error)
      await expect(result).rejects.toThrowError('No user found.')
    })

    it('should throw error if profile not found', async () => {
      const dto = { userId: 'user-id', profileId: 'nonexistent-profile-id' }
      const user = { id: 'user-id', userProfile: [], addUserProfile: jest.fn() }

      dataSource.User.findOne.mockResolvedValue(user)
      dataSource.Profile.findOne.mockResolvedValue(null)

      const result = securityService.registerAcl(dto)

      await expect(result).rejects.toThrow(Api404Error)
      await expect(result).rejects.toThrowError('No profile found.')
    })

    it('should throw error if addUserProfile fails', async () => {
      const dto = { userId: 'user-id', profileId: 'profile-id' }
      const user = { id: 'user-id', userProfile: [], addUserProfile: jest.fn() }
      const profile = { id: 'profile-id' }

      dataSource.User.findOne.mockResolvedValue(user)
      dataSource.Profile.findOne.mockResolvedValue(profile)
      user.addUserProfile.mockRejectedValue(new Error('Database error'))

      const result = securityService.registerAcl(dto)

      await expect(result).rejects.toThrow('Database error')
    })
  })
})