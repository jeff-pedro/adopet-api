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

      if (!result) {
        throw new Error('record not found')
      }

      return res.status(200).json(result)
    } catch (err) {
      if (err.message.includes('record not found')) {
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
      const isUpdated = await this.entityService.updateRecord(updatedData, { where: { id } })

      if (!isUpdated) {
        return res.status(204).json()
      }
    
      return res.status(200).json({ message: 'updated', content: isUpdated })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  async updateOne(req, res, next) {
    const { id } = req.params
    const updatedData = req.body

    try {
      /* Checks if more than one property was passed in the body */
      if (Object.keys(updatedData).length > 1) {
        throw new Error('only one property can be updated at a time')
      }

      const isUpdated = await this.entityService.updateRecord(updatedData, { where: { id } })

      if (!isUpdated) {
        return res.status(204).json()
      }

      return res.status(200).json({ message: 'updated', content: updatedData })
    } catch (err) {
      if (err.message.includes('Validation error')) {
        return res.status(400).json({ error: err.errors[0].message })
      }

      if (err.message === 'only one property can be updated at a time') {
        return res.status(422).json({ error: err.message })
      }

      return res.status(500).json({ error: err.message })
    }
  }

  async delete(req, res, next) {
    const { id } = req.params
    try {
      const isDeleted = await this.entityService.deleteRecord({
        where: { id }
      })

      if (!isDeleted) {
        throw new Error(`id:${id} not found`)
      }

      return res.status(200).json({ message: `id:${id} was deleted` })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }

  async retore(req, res, next) {
    const { id } = req.params
    try {
      await this.entityService.restoreRecord({ where: { id } })
      return res.status(200).json({ message: `id:${id} was restored` }) 
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}

module.exports = Controller