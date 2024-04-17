# Express Server Documentation

This documentation provides an overview of an Express.js server setup.

## Table of Contents

1. [Dependencies](#dependencies)
2. [Environment Variables](#environment-variables)
3. [Routes](#routes)
4. [Database Integration](#database-integration)
5. [Server Initialization](#server-initialization)
6. [Error Handling](#error-handling)

## Dependencies

- `express`: Used as the main framework for the server.
- `dotenv`: For loading environment variables from a `.env` file.
- `sequelize`: For database ORM operations.

## Environment Variables

Ensure that the following environment variables are set in a `.env` file:

- `PORT`: Specifies the port on which the server should listen.

## Routes

The server routes are defined in the `./routes/route.js` file.

## Database Integration

The server integrates with a Sequelize ORM for database operations. The `User` model is defined in `./models/user.js`, and synchronization with the database is handled with `User.sync()`.

## Server Initialization

The server is initialized with the following steps:

1. Instantiate the Express app.
2. Configure the app to use JSON parsing for request bodies (`express.json()`).
3. Define routes using `app.use('/', routes)` to include the routes from `./routes/route.js`.
4. Start the server using `app.listen(PORT)`.

## Error Handling

The server logs a success message if it starts successfully and listens on the specified port. If an error occurs during server startup, the error message is logged.

## Example .env File

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
