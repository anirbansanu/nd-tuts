const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    'tempdb',
    'root',
    null, // Consider adding a password here if required
    {
       host: '127.0.0.1', // Use IP address instead of 'localhost'
       dialect: 'mysql',
       port: 3306, // Ensure the port is correct
     }
 );

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

module.exports=sequelize;