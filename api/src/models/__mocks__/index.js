const User = require('./user')
const Shelter = require('./shelter')
const Pet = require('./pet')
const Adoption = require('./adoption')

const db = {
  User,
  Shelter,
  Pet,
  Adoption,
}

module.exports = db