# Sequelize Database Connection Documentation

This documentation provides an overview of the Sequelize database connection setup.

## Table of Contents

1. [Database Configuration](#database-configuration)
2. [Connection Testing](#connection-testing)

## Database Configuration

The Sequelize instance is created with the following configuration:

- Database Name: `tempdb`
- Username: `root`
- Password: Not specified (consider adding a password if required)
- Host: `127.0.0.1` (IP address instead of 'localhost')
- Dialect: `mysql`
- Port: `3306`

Modify the configuration as needed for your specific database setup.

## Connection Testing

The database connection is tested using `sequelize.authenticate()`:

- If the connection is successful, the message 'Connection has been established successfully.' is logged to the console.
- If there's an error connecting to the database, the error message is logged to the console.

Ensure that your database server is running and accessible using the provided configuration.

## Example Usage

```javascript
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
