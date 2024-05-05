// https://stackoverflow.com/questions/22938375/nodejs-sequelize-how-to-truncate-a-foreign-key-referenced-table
const database = require('../../models')
module.exports = async () => {
  try {
    await database.Adoption.destroy({ truncate: { cascade: true } })
    await database.Pet.destroy({ truncate: { cascade: true } })
    await database.User.destroy({ truncate: { cascade: true } })
    await database.Shelter.destroy({ truncate: { cascade: true } })
    await database.Profile.destroy({ truncate: { cascade: true } })
      
    return
  } catch (err) {
    throw new Error(err)
  }
}
