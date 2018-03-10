const express = require('express');
const passport =require('passport');
const router = express.Router();

router.get('/google', (req, res)=>{
    res.send('auth');
});



module.exports = router;