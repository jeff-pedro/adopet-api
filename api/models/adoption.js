'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Adoption extends Model {
    static associate(models) {
      Adoption.belongsTo(models.User, {
        foreignKey: 'tutor_id'
      })

      Adoption.belongsTo(models.Pet, { 
        as: 'adoptionOnePet', 
        foreignKey: 'pet_id'
      })
    }
  }
  Adoption.init({
    animal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'animal field is required' },
        notEmpty: { msg: 'animal field cannot be empty' },
        async isUnique(value) {
          const animalAdopted = await Adoption.findOne({ 
            where: { 
              animal: value 
            } 
          })
          if (animalAdopted) {
            throw new Error('this pet was already adopted')
          }
        },
      },
    },
    tutor: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'tutor field is required' },
        notEmpty: { msg: 'tutor field cannot be empty' }
      }
    },
    date: {
      type: DataTypes.DATE,
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