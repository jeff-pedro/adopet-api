const { AuthService } = require('../services')

const authService = new AuthService()

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body
    
    try {
      const { user, token} = await authService.login({ email, password })

      res.status(200).json({ user, accessToken: token })
    } catch (err) {
      res.status(401).send({ error: err.message })
    }
  }
}

module.exports = AuthController
