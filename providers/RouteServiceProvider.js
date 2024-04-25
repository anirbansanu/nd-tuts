// RouteServiceProvider.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const {log} = require('../overrides/index');
class RouteServiceProvider {
    constructor(app) {
        this.app = app;
    }

    registerRoutes() {
        const routesPath = path.join(__dirname, '../routes');
        log("Registering routes...");
        fs.readdirSync(routesPath).forEach((file) => {
            if (file.endsWith('.js')) {
                const route = require(path.join(routesPath, file));
                log(`\nFrom ${file.replace('.js', '') }`);
                this.app.use(route.basePath, route.router);
                this.logRoutes(route.router);
            }
        });
    }
    logRoutes(router) {
        router.stack.forEach((layer) => {
            if (layer.route) {
                layer.route.stack.forEach((handler) => {
                    log(`Route: ${handler.method.toUpperCase()} ${layer.route.path}`);
                });
            }
        });
    }
    
}

module.exports = RouteServiceProvider;
