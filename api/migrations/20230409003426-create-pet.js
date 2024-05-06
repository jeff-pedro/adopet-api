'use strict'

const { UUIDV4 } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pets', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: UUIDV4
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      birthday: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      size: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      personality: {
        allowNull: false,
        type: Sequelize.STRING
      },
      species: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      profilePictureUrl: {
        allowNull: false,
        type: Sequelize.STRING
      },
      shelter_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: 'shelters', key: 'id' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pets')
  }
}