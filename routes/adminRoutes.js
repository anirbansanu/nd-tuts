const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Admin Dashboard Page');
});
router.get('/dashboard', (req, res) => {
    res.send('Admin Dashboard Page');
});
router.get('/users', (req, res) => {
    res.send('Admin Dashboard Page');
});

module.exports = {
    basePath: '/admin',
    router,
};