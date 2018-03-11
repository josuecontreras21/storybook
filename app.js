const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport'); 
//radom comment

// Passport config
require('./config/passport')(passport);

//Load Routes 
const authRoutes = require('./routes/auth');

const app = express();

//Use Routes
app.get('/', (req, res)=>{res.send('Hello World!')})
app.use('/auth', authRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`))