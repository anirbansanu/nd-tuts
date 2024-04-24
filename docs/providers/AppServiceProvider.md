## AppServiceProvider.js

This file contains the `AppServiceProvider` class, which is responsible for registering various configurations, middleware, routes, cache services, and error handlers in an Express application.

### Class: AppServiceProvider

#### Constructor

- **Parameters**: `app` (Express application) - The Express application instance.
- **Description**: Initializes the `AppServiceProvider` with the Express application instance, a `RouteServiceProvider` instance, and a NodeCache instance for caching.

#### Method: registerApp()

- **Description**: Registers all necessary configurations and setups for the application.
- **Steps**:
  1. Calls `registerMiddleware()` to register global middleware.
  2. Calls `registerLogger()` to register logging middleware.
  3. Calls `registerRoutes()` to register routes using the `RouteServiceProvider`.
  4. Calls `registerCacheService()` to handle caching.
  5. Calls `registerErrorHandlers()` to register error handlers.

#### Method: registerMiddleware()

- **Description**: Registers global middleware for the Express application.
- **Steps**:
  - Uses `express.json()` and `express.urlencoded({ extended: true })` for JSON and form data parsing.
  - Serves static files from the 'public' directory.

#### Method: registerErrorHandlers()

- **Description**: Registers error handling middleware for the Express application.
- **Steps**:
  - Handles server errors (500) by logging the error and sending a 'Something broke!' response.
  - Handles not found errors (404) by sending the '404.html' file from the 'public' directory.

#### Method: registerLogger()

- **Description**: Registers logging middleware for the Express application.
- **Steps**:
  - Logs each incoming request with IP, method, and URL information.

#### Method: registerRoutes()

- **Description**: Registers routes using the `RouteServiceProvider`.

#### Method: registerCacheService()

- **Description**: Handles caching of data.
- **Steps**:
  - Checks if data is available in the cache and logs it if found.
  - If data is not cached, fetches data from the database or external API, caches it for 60 seconds, and logs it.

### Example Usage:

```javascript
const express = require('express');
const AppServiceProvider = require('./AppServiceProvider');

const app = express();

const appServiceProvider = new AppServiceProvider(app);
appServiceProvider.registerApp();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

This example creates an Express application, initializes the AppServiceProvider with the app instance, registers all configurations and setups using the registerApp() method, and starts the server listening on port 3000.