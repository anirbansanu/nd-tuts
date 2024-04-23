const express = require('express');
const app = express();

const RouteServiceProvider = require('./RouteServiceProvider');
const AppServiceProvider = require('./AppServiceProvider');

// Initialize AppServiceProvider
const appServiceProvider = new AppServiceProvider(app);

/// Register all necessary configurations with one method call
appServiceProvider.registerApp();


// Other app configurations and middleware...

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});