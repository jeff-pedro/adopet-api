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

  async createRecord(dto, transaction) {
    return dataSource[this.model].create({
      id: uuidv4(),
      ...dto
    }, { transaction })
  }

  async updateRecord(dto, id, transaction) {
    const updatedRecordList = await dataSource[this.model].update(dto, { 
      where: { id },
      transaction 
    })

    if (updatedRecordList[0] === 0) {
      return false
    }

    return dataSource[this.model].findOne({ where: { id } })
  }

  async updateRecordByScope(scopeName, dto, options) {
    return dataSource[this.model]
      .scope(scopeName)
      .update(dto, { ...options })
  }

  async deleteRecord(options) {
    return dataSource[this.model].destroy({ ...options })
  }

  async restoreRecord(id) {
    return dataSource[this.model].restore({ where: { id }})
  }
}

module.exports = Services
