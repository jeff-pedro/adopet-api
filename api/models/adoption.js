'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Adoption extends Model {
    static associate(models) {
      Adoption.belongsTo(models.User, {
        foreignKey: 'tutor_id',
      })

      Adoption.belongsTo(models.Pet, { 
        foreignKey: 'pet_id'
      })
    }
  }
  Adoption.init({
    pet_id: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: { msg: 'pet_id field is required' },
        notEmpty: { msg: 'pet_id field cannot be empty' },
        /* async isUnique(value) {
          const petAdopted = await Adoption.findOne({ 
            where: { 
              pet_id: value 
            } 
          })
          if (petAdopted) {
            throw new Error('this pet was already adopted')
          }
        }, */
      },
    },
    tutor_id: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: { msg: 'tutor_id field is required' },
        notEmpty: { msg: 'tutor_id field cannot be empty' }
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: { msg: 'date field is required' },
        notEmpty: { msg: 'date field cannot be empty' },
        isDate: { msg: 'invalid date format (yyyy-mm-dd)' }
      },
      defaultValue: new Date()
    }
  }, {
    sequelize,
    modelName: 'Adoption',
    tableName: 'adoptions'
  })
  return Adoption
}