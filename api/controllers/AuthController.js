const { AuthService } = require('../services')
const Controller = require('./Controller.js')

const authService = new AuthService()

class AuthController extends Controller {
  static async login(req, res, next) {
    const { email, password } = req.body
    
    try {
      const { user, token} = await authService.login({ email, password })

      res.status(200).json({ user, accessToken: token })
    } catch (err) {
      return next(err)
    }
  }

  static async registerUser(req, res, next) {
    const data = req.body
    try {
      const result = await authService.register(data)
      return res.status(201).json(result) 
    } catch (err) {
      return next(err)
    }
  }
}

module.exports = AuthController
