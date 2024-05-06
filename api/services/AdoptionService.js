const { v4: uuid } = require('uuid')
const dataSource = require('../models')
const Services = require('./Services.js')

class AdoptionService extends Services {
  constructor() {
    super('Adoption')
  }
}

module.exports = AdoptionService
