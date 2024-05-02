const { v4: uuidv4 } = require('uuid')
const database = require('../models')
const Services = require('./Services')

class ProfileService extends Services {
  constructor() {
    super('Profile')
  }
}

module.exports = ProfileService