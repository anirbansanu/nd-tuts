// RouteServiceProvider.js
const express = require('express');
const fs = require('fs');
const path = require('path');

class RouteServiceProvider {
    constructor(app) {
        this.app = app;
    }

    registerRoutes() {
        const routesPath = path.join(__dirname, '../routes');
        console.info("synchronizing routes...");
        fs.readdirSync(routesPath).forEach((file) => {
            if (file.endsWith('.js')) {
                const route = require(path.join(routesPath, file));
                console.info(path.join(routesPath, file));
                this.app.use(route.basePath, route.router);
            }
        });
    }
}

module.exports = RouteServiceProvider;
