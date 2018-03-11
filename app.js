const express = require('express');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
//Load Routes 
const authRoutes = require('./routes/auth');

const app = express();

//Map global promises
mongoose.Promise = Promise;

//Mongoose Connect
mongoose.connect(keys.mongoURI)
    .then(() => console.log('Connected to DB...'))
    .catch(err => console.log(err));
mongoose.set('debug', true);

// Passport config
app.use(expressSession({
    secret: 'Ella baila la mangulina 40',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Set global vars
app.use((req, res, next) => {
    res.locals.currentUser = req.user || null;
    next();
});

//Load moment package
app.use((req, res, next) => {
    res.locals.moment = require('moment');
    next();
});

//body-parsing middleware 
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//Use Routes
app.get('/', (req, res) => { res.send('Hello World!') });
app.use('/auth', authRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));