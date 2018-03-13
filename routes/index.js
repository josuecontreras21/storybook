const express = require('express');
const router = express.Router();
const middleware = require('../middleware');

router.get('/', (req, res) => res.render('index'));
router.get('/dashboard', middleware.isLoggedIn, (req, res) => {
    res.render('index/dashboard');
});

module.exports = router;