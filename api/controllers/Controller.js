const Api404Error = require('../errors/api404Error.js')
const ValidationError = require('../errors/validationError.js')
const InvalidArgumentError = require('../errors/invalidArgumentError.js')
const { Sequelize } = require('sequelize')

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
        throw new Api404Error(`Record with id:${id} not found`)
      }

      return res.status(200).json(result)
    } catch (err) {
      return next(err)
    }
  }

  async createNew(req, res, next) {
    try {
      const result = await this.entityService.createRecord(req.body)
      return res.status(200).json(result)
    } catch (err) {
      if (err instanceof Sequelize.ValidationError) {
        throw new ValidationError(err.message)
      }
      return next(err)
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
      return next(err)
    }
  }

  async updateOne(req, res, next) {
    const { id } = req.params
    const updatedData = req.body

    try {
      /* Checks if more than one property was passed in the body */
      if (Object.keys(updatedData).length > 1) {
        throw new InvalidArgumentError('only one property can be updated at a time')
      }

      const isUpdated = await this.entityService.updateRecord(updatedData, { where: { id } })

      if (!isUpdated) {
        return res.status(204).json()
      }

      return res.status(200).json({ message: 'updated', content: updatedData })
    } catch (err) {
      return next(err)
    }
  }

  async delete(req, res, next) {
    const { id } = req.params
    try {
      const isDeleted = await this.entityService.deleteRecord({
        where: { id }
      })

      if (!isDeleted) {
        throw new Api404Error(`Record with id:${id} not found`)
      }

      return res.status(200).json({ message: `id:${id} was deleted` })
    } catch (err) {
      return next(err)
    }
  }

  async retore(req, res, next) {
    const { id } = req.params
    try {
      await this.entityService.restoreRecord({ where: { id } })
      return res.status(200).json({ message: `id:${id} was restored` }) 
    } catch (err) {
      return next(err)
    }
  }
}

module.exports = Controller