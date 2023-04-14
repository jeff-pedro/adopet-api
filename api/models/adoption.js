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
      this.belongsTo(models.Pet, { foreignKey: 'animal' })
    }
  }
  Adoption.init({
    tutor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    date: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          args: true,
          msg: 'invalid date format (yyyy-mm-dd)'
        }
      },
      defaultValue: new Date()
    }
  }, {
    sequelize,
    modelName: 'Adoption',
  })
  return Adoption
}