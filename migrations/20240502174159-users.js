'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      phone_number: {
        allowNull: true,
        unique: true,
        type: Sequelize.STRING(24)
      },
      phone_verified_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      email_verified_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      api_token: {
        allowNull: true,
        unique: true,
        type: Sequelize.CHAR(60)
      },
      device_token: {
        allowNull: true,
        type: Sequelize.STRING
      },
      remember_token: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
