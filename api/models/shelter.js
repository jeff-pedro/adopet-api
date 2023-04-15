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
      Shelter.hasMany(models.Pet, { foreignKey: 'shelter_id' })
    }
  }
  Shelter.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'field name is required'
        },
        notEmpty: {
          msg: 'invalid empty field'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'field email is required'
        },
        isEmail: {
          msg: 'invalid email format'
        }
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'field phone is required'
        },
        notEmpty: {
          msg: 'invalid empty field'
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'field city is required'
        },
        notEmpty: {
          msg: 'invalid empty field'
        }
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'field state is required'
        },
        notEmpty: {
          msg: 'invalid empty field'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Shelter',
  })
  return Shelter
}