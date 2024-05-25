/* eslint-disable no-unused-vars */
'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'deletedAt', {
      allowNull: true,
      type: Sequelize.DATE
    }
    )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'deletedAt')
  }
}