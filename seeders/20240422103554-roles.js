'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Roles', [
      {
        name: 'admin',
        guard_name: 'web',
        default: 0,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'vendor',
        guard_name: 'web',
        default: 0,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'user',
        guard_name: 'web',
        default: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
    ],{});
  },
  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('Roles', null, {});
     
  }
};
