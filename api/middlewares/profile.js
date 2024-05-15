const database = require('../database/models')

const profile = (profileList) => {
  return async (req, res, next) => {
    const userId  = req.userId

    const user = await database.User.findOne({
      include: [{
        model: database.Profile,
        as: 'userProfile',
        attributes: ['name']
      }],
      where: {
        id: userId
      }
    })

    if (!user) {
      return res.status(401).json({ message: 'No user found.' })
    }

    const profileRegistered = await user.userProfile
      .map((profile) => profile.name)
      .some((profile) => profileList.includes(profile))

    if (!profileRegistered) {
      return res.status(401).json({ error: 'Unauthorized profile.' })
    }

    return next()
  }
} 

module.exports = profile