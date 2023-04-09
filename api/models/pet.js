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
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    birthday: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: true,
        isDate: true
      }
    },
    size: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isIn: {
          args: [['Mini', 'Small', 'Medium', 'Large', 'Giant']],
          msg: 'accepted options: [ Mini, Small, Medium, Large, Giant ]'
        }
      }
    },
    personality: DataTypes.STRING,
    species: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isIn: {
          args: [['Dog', 'Cat']],
          msg: 'accept options: [ Dog, Cat ]'
        }
      },
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['New', 'Available', 'Adopted', 'Quarentine', 'Removed', 'Suspended']],
          msg: 'accepted options: [ New, Available, Adopted, Quarentine, Removed, Suspended ]'
        }
      },
      defaultValue: 'New'
    },
    profilePictureUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pet',
  })
  return Pet
}