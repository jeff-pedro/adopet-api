const dataSource = require('../models')

class Services {
  constructor(modelName) {
    this.model = modelName
  }

  getAllRecords(options = {}) {
    return dataSource[this.model].findAll(options)
  }
}

module.exports = Services
