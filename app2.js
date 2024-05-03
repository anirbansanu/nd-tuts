const express = require('express');
const app = express();
const path = require('path');

app.set('views', path.join(__dirname+'/views'));
app.set("view engine", "hbs");
const AppServiceProvider = require('./providers/AppServiceProvider');

// Initialize AppServiceProvider
const appServiceProvider = new AppServiceProvider(app);

/// Register all necessary configurations with one method call
appServiceProvider.registerApp();


// Other app configurations and middleware...

app.listen(3000, () => {
    console.log('\nServer is running on port 3000');
});
