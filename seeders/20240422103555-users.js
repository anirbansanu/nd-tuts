'use strict';
const faker = require('faker');
const { v4: uuidv4 } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const usersData = [];

    // Generate 1000 user objects with Faker
    for (let i = 1; i <= 100; i++) {
      usersData.push({
        name: faker.name.findName(),
        email: faker.internet.email(),
        phone_number: faker.phone.phoneNumber(),
        password: faker.internet.password(),
        api_token: uuidv4(),         
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Insert the generated user data into the 'users' table
    await queryInterface.bulkInsert('users', usersData, {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
