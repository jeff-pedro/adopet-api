const { ProfileService } = require('../services')

const profileService = new ProfileService()

class ProfileController {

  static async createProfile(req, res) {
    const { name, description } = req.body

    try {
      const profile = await profileService.create({ name, description })
      res.status(201).json(profile)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
    
  static async getAllProfiles(req, res) {
    try {
      const profiles = await profileService.getAll()
      res.status(200).json(profiles)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  static async getOneProfile(req, res) {
    const { id } = req.params
    
    try {
      const profile = await profileService.getOne(id)
      res.status(200).json(profile)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  static async updateProfile(req, res) {
    const { id } = req.params
    const data = req.body

    try {
      const profile = await profileService.update({ id, ...data })

      res.status(200).json(profile)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  static async deleteProfile(req, res) {
    const { id } = req.params

    try {
      await profileService.delete(id)
      res.status(200).json({ message: `Profile with id: ${id} was deleted.` })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}

module.exports = ProfileController