'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Adoption, {
        foreignKey: 'tutor_id'
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate:{
        notEmpty: true,
        notNull: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
                
      }
    },
    phone: DataTypes.STRING,
    city: DataTypes.STRING,
    about: DataTypes.STRING,
    profilePictureUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      },
    },
    role: {
      type: DataTypes.STRING,
      validate:{
        isIn: [['administrator','standard']],
        min: 7
      }, 
      defaultValue: 'standard'
    }
  }, {
    sequelize,
    modelName: 'User',
  })
  return User
}