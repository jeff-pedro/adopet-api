const { v4: uuidv4 } = require('uuid')
const database = require('../models')

class ProfileService {
  async create(dto) {
    const profileExists = await database.Profile.findOne({
      where: {
        name: dto.name
      }
    })

    if (profileExists) {
      throw new Error('Profile already exists.')
    }

    try {
      const newProfile = await database.Profile.create({
        id: uuidv4(),
        ...dto
      })

      return newProfile
    } catch (err) {
      throw new Error(err)
    }
  }

  async getAll() {
    try {
      const profiles = await database.Profile.findAll()

      if (!profiles) {
        throw new Error('No profile found.')
      }

      return profiles
    } catch (err) {
      throw new Error(err)
    }
  }

  async getOne(id) {
    try {
      const profile = await database.Profile.findOne({
        where: { id }
      })

      if (!profile) {
        throw new Error('No profile found.')
      }

      return profile
    } catch (err) {
      throw new Error(err)
    }
  }

  async update(dto) {
    try {
      const profile = await database.Profile.findOne({
        where: {
          id: dto.id
        }
      })
  
      if (!profile) {
        throw new Error('No profile found.')
      }

      profile.name = dto.name
      profile.description = dto.description

      await profile.save()
     
      return await profile.reload() 
    } catch (err) {
      throw new Error(err)
    }
  }

  async delete (id) {
    const profile = await database.Profile.findOne({
      where: { id }
    })

    if (!profile) {
      throw new Error('No profile found.')
    }
    
    try {
      await database.Profile.destroy({
        where: { id }
      })
      
      return
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = ProfileService