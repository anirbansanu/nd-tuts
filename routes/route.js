// 3rd Party Modules 
const { Router } = require('express'); 

// Local Modules 
const homeController = require('../controllers/homeController'); 

// Initialization 
const router = Router(); 

// Requests 
router.get('/', homeController.method1); 
router.get('/home', homeController.method2); 

module.exports = router;
