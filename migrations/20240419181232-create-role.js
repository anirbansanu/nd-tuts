'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      guard_name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'web'
      },
      default: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      },
      
    },
    {
      Sequelize,
      modelName: 'Role',
      tableName: 'roles', // You can specify the table name if needed
      timestamps: true, // Set to true if you want Sequelize to handle timestamps
      underscored: true, // Use underscored naming for columns (e.g., created_at instead of createdAt)
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Roles');
  }
};