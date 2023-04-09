'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pet.belongsTo(models.User, {
        foreignKey: 'owner_id'
      })
      Pet.belongsTo(models.Shelter, {
        foreignKey: 'shelter_id'
      })
    }
  }
  Pet.init({
    name: DataTypes.STRING,
    birthday: DataTypes.DATEONLY,
    size: DataTypes.STRING,
    personality: DataTypes.STRING,
    species: DataTypes.STRING,
    status: DataTypes.STRING,
    profilePictureUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pet',
  })
  return Pet
}