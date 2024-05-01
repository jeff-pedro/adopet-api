class Controller {
  constructor(entityService) {
    this.entityService = entityService
  }

  async getAll(req, res, next) {
    try {
      const recordsList = this.entityService
      req.result = recordsList
      return next()
    } catch (err) {
      return next(err)
    }
  }
}

module.exports = Controller