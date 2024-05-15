'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsToMany(models.User, {
        through: models.profile_user,
        as: 'profileUser',
        foreignKey: 'profile_id'
      })

      Profile.belongsToMany(models.Permission, {
        through: models.profile_permission,
        as: 'profilePermissions',
        foreignKey: 'profile_id'
      })
    }
  }
  Profile.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profile',
  })
  return Profile
}