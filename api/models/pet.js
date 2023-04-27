'use strict'
const {
  Model, Op
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Shelter, { foreignKey: 'shelter_id' })
      this.hasOne(models.Adoption, { foreignKey: 'animal' })
    }
  }
  Pet.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'name field is required' },
        notEmpty: { msg: 'name field cannot be empty' }
      }
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'birthday field is required' },
        notEmpty: { msg: 'birthday field cannot be empty' },
        isDate: { msg: 'invalid date format' }
      }
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'size field is required' },
        notEmpty: { msg: 'size field cannot be empty' },
        isIn: {
          args: [['Mini', 'Small', 'Medium', 'Large', 'Giant']],
          msg: 'accepted options: [ Mini, Small, Medium, Large, Giant ]'
        }
      }
    },
    personality: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'personality field is required' },
        notEmpty: { msg: 'personality field cannot be empty' }
      }
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'species field is required' },
        notEmpty: { msg: 'species field cannot be empty' },
        isIn: {
          args: [['Dog', 'Cat']],
          msg: 'accepted options: [ Dog, Cat ]'
        }
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'status field is required' },
        notEmpty: { msg: 'status field cannot be empty' },
        isIn: {
          args: [['New', 'Available', 'Adopted', 'Quarentine', 'Removed', 'Suspended']],
          msg: 'accepted options: [ New, Available, Adopted, Quarentine, Removed, Suspended ]'
        }
      },
      defaultValue: 'New'
    },
    profilePictureUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'profilePictureUrl field is required' },
        notEmpty: { msg: 'profilePictureUrl field cannot be empty' },
        isUrl: {
          msg: 'invalid URL format'
        }
      }
    },
    shelter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'shelter_id field is required' },
        notEmpty: { msg: 'shelter_id field cannot be empty' }
      }
    }
  }, {
    sequelize,
    modelName: 'Pet',
    defaultScope: {
      where: {
        [Op.not]: {
          status: 'Adopted'
        }
      }
    }
  })
  return Pet
}