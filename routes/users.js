const express = require('express');
const router = express.Router({mergeParams: true});

const User = require('../models/user');
const middleware = require('../middleware');

router.get('/', (req, res)=>{
    res.redirect('/');
});

// router.get('/:user_id',(req, res)=>{
//     User.findById(req.params.user_id).exec()
//     .then((user)=> res.render('user/profile', {user: user}))
//     .catch(err => console.log(err));
// });

module.exports = router;