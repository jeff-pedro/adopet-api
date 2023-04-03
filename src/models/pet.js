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
            // define association here
        }
    }
    Pet.init({
        name: DataTypes.STRING,
        birthday: DataTypes.DATE,
        sex: DataTypes.STRING,
        size: DataTypes.STRING,
        personality: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Pet',
    })
    return Pet
}