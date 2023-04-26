'use strict'
const {
  Model
} = require('sequelize')
const { Sequelize } = require('.')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Adoption, {
        foreignKey: 'tutor'
      })
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'name field is required'
        },
        notEmpty: {
          args: true,
          msg: 'name field cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: 'email field is required'
        },
        notEmpty: {
          msg: 'email field cannot be empty'
        },
        isEmail: {
          msg: 'invalid email format'
        },
        isUnique: async (value,) => {
          const user = await User.findOne({
            where: { email: value }
          })
          if (user !== null) {
            throw new Error('email already in use')
          }
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'password field is required'
        },
        notEmpty: {
          msg: 'password field cannot be empty'
        }
      }
    },
    phone: DataTypes.STRING,
    city: DataTypes.STRING,
    about: DataTypes.STRING,
    profilePictureUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          args: true,
          msg: 'invalid URL format'
        }
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'role field is required'
        },
        isIn: {
          args: [['administrator', 'standard']],
          msg: 'accepted options: [ administrator, standard ]'
        }
      },
      defaultValue: 'standard'
    }
  }, {
    sequelize,
    modelName: 'User',
  })
  return User
}