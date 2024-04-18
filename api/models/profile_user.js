'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class profile_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  profile_user.init({
    profile_id: DataTypes.UUID,
    user_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'profile_user',
  })
  return profile_user
}