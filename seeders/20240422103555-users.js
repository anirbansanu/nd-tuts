'use strict';
const { v4: uuidv4 } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        name: 'Admin',
        email: 'admin.admin.com',
        phone_number: '1234567890',
        password: 'admin',
        api_token: uuidv4(), 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone_number: '0987654321',
        password: 'securepass',
        api_token: uuidv4(), 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        phone_number: '1112223333',
        password: 'alicepass',
        api_token: uuidv4(), 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bob Brown',
        email: 'bob.brown@example.com',
        phone_number: '4445556666',
        password: 'bobpass',
        api_token: uuidv4(), 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        phone_number: '7778889999',
        password: 'emilypass',
        api_token: uuidv4(), 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Michael Wilson',
        email: 'michael.wilson@example.com',
        phone_number: '5554443333',
        password: 'michaelpass',
        api_token: uuidv4(), 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sarah Anderson',
        email: 'sarah.anderson@example.com',
        phone_number: '9998887777',
        password: 'sarahpass',
        api_token: uuidv4(), 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'David Martinez',
        email: 'david.martinez@example.com',
        phone_number: '6667778888',
        password: 'davidpass',
        api_token: uuidv4(), 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jessica Taylor',
        email: 'jessica.taylor@example.com',
        phone_number: '3332221111',
        password: 'jessicapass',
        api_token: uuidv4(), 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Daniel Thomas',
        email: 'daniel.thomas@example.com',
        phone_number: '2223334444',
        password: 'danielpass',
        api_token: uuidv4(), 
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];

    await queryInterface.bulkInsert('users', users, {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
