const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('User Home Page');
});
router.get('/signup', (req, res) => {
    res.send('User signup Page');
});

module.exports = {
    basePath: '/users',
    router,
};