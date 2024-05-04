'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('adoptions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      pet_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: 'pets', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      tutor_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: 'users', key: 'id' }
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
    await queryInterface.dropTable('adoptions')
  }
}