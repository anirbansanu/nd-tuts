const express = require('express');

const userController = require('../controllers/web/users/UserController');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Admin Dashboard Page');
});
router.get('/dashboard', (req, res) => {
    res.send('Admin Dashboard Page');
});
// Route to get a user
router.get('/users/:id', userController.getUser);

// Route to delete a user
router.delete('/users/:id', userController.deleteUser);

// Route to list all users
router.get('/users', userController.listUsers);

// Route to get users with specified fields
router.get('/users/fields', userController.getUsersWithFields);

// Route to build a tree
router.get('/users/tree', userController.buildTree);

// Route to filter a user
router.get('/users/filter/:id', userController.filterUser);

// Route to get users with limit and offset
router.get('/users/limit', userController.getUsersWithLimit);

module.exports = {
    basePath: '/admin',
    router,
};