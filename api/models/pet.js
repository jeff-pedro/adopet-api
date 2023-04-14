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
      validate: {
        notEmpty: true
      }
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'field birthady is required'
        },
        isDate: {
          msg: 'invalid date format'
        }
      }
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'field size is required'
        },
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
        notNull: {
          msg: 'field personality is required'
        }
      }
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'field species is required'
        },
        isIn: {
          args: [['Dog', 'Cat']],
          msg: 'accept options: [ Dog, Cat ]'
        }
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'field status is required'
        },
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
        notNull: {
          msg: 'field profilePictureUrl is required'
        },
        isUrl: {
          msg: 'invalid URL format'
        }
      }
    },
    shelter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'field shelter_id is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Pet',
    defaultScope: {
      where: {
        [Op.not]: {
          status:'Adopted'
        }
      }
    }
  })
  return Pet
}