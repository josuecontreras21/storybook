const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const Story = require('../models/story');

router.get('/', (req, res) => res.render('index'));
router.get('/dashboard', middleware.isLoggedIn, (req, res) => {
    Story.find({'author._id': req.user._id}).exec()
    .then(stories => res.render('index/dashboard', {stories: stories}))
    .catch(err => console.log(ertt));
});

module.exports = router;