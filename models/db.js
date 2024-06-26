require('dotenv/config'); 
const { Sequelize, DataTypes, Op } = require("sequelize");

const db = new Sequelize(
   process.env.DB_DATABASE, // Database name 
   process.env.DB_USERNAME,   // Username
   process.env.DB_PASSWORD, // Consider adding a password here if required
   {
      host: process.env.DB_HOST, // Use IP address instead of 'localhost'
      dialect: process.env.DB_CONNECTION,
      port: process.env.DB_PORT, // Ensure the port is correct
   }
);

db.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});
db.role = require("./role.model.js")(db, Sequelize, DataTypes);
module.exports=db;