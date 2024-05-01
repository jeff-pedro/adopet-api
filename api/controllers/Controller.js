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

  async getById(req, res, next) {
    const { id } = req.params

    try {
      const result = await this.entityService.getRecordById(id)
      return res.status(200).json(result)
    } catch (err) {
      if (err.message.includes('Tutor not found')) {
        return res.status(404).json({ error: err.message })
      }
      return res.status(500).json({ error: err.message })
    }
  }

  async createNew(req, res, next) {
    const data = req.body

    try {
      if (Object.keys(data).length === 0) {
        throw new Error('empty request body')
      }

      const result = await this.entityService.createRecord(data)

      return res.status(200).json(result)

    } catch (err) {
      if (err.message.includes('Validation error')) {
        return res.status(400).json({ error: err.message })
      }

      if (err.message === 'empty request body') {
        return res.status(400).json({ error: err.message })
      }

      return res.status(500).json({ error: err.message })
    }
  }

  async updateMany(req, res, next) {
    const { id } = req.params
    const updatedData = req.body

    try {
      const isUpdated = await this.entityService.update(updatedData, id)

      if (!isUpdated) {
        return res.status(204).json()
      }
    
      return res.status(200).json({ message: 'tutor updated', content: isUpdated })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }
}

module.exports = Controller