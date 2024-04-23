// Local Modules 
const homeController = require('../controllers/homeController'); 


const express = require('express');
const router = express.Router();

router.get('/', homeController.method1); 
router.get('/home', homeController.method2); 

module.exports = {
    basePath: '/',
    router,
};
