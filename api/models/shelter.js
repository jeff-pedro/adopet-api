'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Shelter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Shelter.hasMany(models.Pet, { 
        foreignKey: 'shelter_id' 
      })
    }
  }
  Shelter.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'name field is required' },
        notEmpty: { msg: 'name field cannot be empty' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'email field is required' },
        notEmpty: { msg: 'email field cannot be empty' },
        isEmail: { msg: 'invalid email format' }
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'phone field is required' },
        notEmpty: { msg: 'phone field cannot be empty' }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'city field is required' },
        notEmpty: { msg: 'city field cannot be empty' }
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'state field is required' },
        notEmpty: { msg: 'state field cannot be empty' }
      }
    }
  }, {
    sequelize,
    modelName: 'Shelter',
    tableName: 'shelters',
    paranoid: true
  })
  return Shelter
}