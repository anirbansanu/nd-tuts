const express = require('express');
const path = require('path');
const NodeCache = require('node-cache'); // Import the cache library
const RouteServiceProvider = require('./RouteServiceProvider');
// AppServiceProvider.js
class AppServiceProvider {
    constructor(app) {
        this.app = app;
        this.routeServiceProvider = new RouteServiceProvider(app);
        this.cache = new NodeCache();

    }
    // Register all necessary configurations and setups
    registerApp() {
        this.registerMiddleware();
        this.registerLogger();
        this.registerRoutes(); // Optionally, if routes are also set up in AppServiceProvider
        this.registerCacheService();
        this.registerErrorHandlers();
        
    }
    registerMiddleware() {
        // Register global middleware here
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        // Serve static files from the 'public' directory
        this.app.use(express.static(path.join(__dirname, '../public')));
    }

    registerErrorHandlers() {
        // Register error handlers here
        
        this.app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send('Something broke!');
        });
        this.app.use((req, res, next) => {
            res.status(404).sendFile(path.join(__dirname, '../public', '404.html'));
        });
    }

    registerLogger() {
        // Register logger or logging middleware here
        this.app.use((req, res, next) => {
            console.log(`[${new Date().toISOString()}] ip:${req.ip} ${req.method} ${req.url}`);
            next();
        });
    }

    registerRoutes() {
        // Register routes using the RouteServiceProvider
        this.routeServiceProvider.registerRoutes();
    }
    registerCacheService() {
        /// Get cached data if available, otherwise fetch and cache the data
        const cachedData = this.cache.get('cachedData');
        if (cachedData) {
            console.log('Data from cache:', cachedData);
        } else {
            // Fetch data from the database or external API
            // const newData = fetchSomeData();
            // // Cache the fetched data
            // this.cache.set('cachedData', newData, 60); // Cache for 60 seconds
            // console.log('Fetched cachedData:', newData);
        }
    }
}

module.exports = AppServiceProvider;
