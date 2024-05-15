const dataSource = require('../models')
const { v4: uuidv4 } = require('uuid')

class Services {
  constructor(modelName) {
    this.model = modelName
  }

  async getAllRecords(options = {}) {
    return dataSource[this.model].findAll(options)
  }

  async getRecordById(id) {
    return dataSource[this.model].findByPk(id)
  }

  async createRecord(dto) {
    return dataSource[this.model].create({
      id: uuidv4(),
      ...dto
    })
  }

  async updateRecord(dto, id) {
    const updatedRecordList = await dataSource[this.model].update(dto, { where: { id } })

    if (updatedRecordList[0] === 0) {
      return false
    }

    return dataSource[this.model].findOne({ where: { id } })
  }

  async deleteRecord(id) {
    return dataSource[this.model].destroy({ where: { id } })
  }

  async restoreRecord(id) {
    return dataSource[this.model].restore({ where: { id }})
  }
}

module.exports = Services
