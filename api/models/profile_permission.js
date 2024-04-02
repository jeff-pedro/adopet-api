'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profile_permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  profile_permission.init({
    profile_id: DataTypes.UUID,
    permission_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'profile_permission',
  });
  return profile_permission;
};