'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Adoption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Pet, {
        foreignKey: 'pet_id'
      })
      this.belongsTo(models.User, {
        foreignKey: 'tutor_id'
      })
    }
  }
  Adoption.init({
    date: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Adoption',
  })
  return Adoption
}