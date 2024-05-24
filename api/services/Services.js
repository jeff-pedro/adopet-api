const dataSource = require('../database/models')
const { v4: uuidv4 } = require('uuid')

class Services {
  constructor(modelName) {
    this.model = modelName
  }

  async getAllRecords(options) {
    return dataSource[this.model].findAll({ ...options })
  }

  async getRecordById(id) {
    return dataSource[this.model].findByPk(id)
  }

  async createRecord(dto, options) {
    return dataSource[this.model].create({
      id: uuidv4(),
      ...dto
    }, { ...options })
  }

  async updateRecord(dto, options) {
    const updatedRecordList = await dataSource[this.model].update(dto, { ...options })

    if (updatedRecordList[0] === 0) {
      return false
    }

    return dataSource[this.model].findOne({ ...options })
  }

  async updateRecordByScope(scopeName, dto, options) {
    return dataSource[this.model]
      .scope(scopeName)
      .update(dto, { ...options })
  }

  async deleteRecord(options) {
    return dataSource[this.model].destroy({ ...options })
  }

  async restoreRecord(options) {
    return dataSource[this.model].restore({ ...options })
  }
}

module.exports = Services
