const expressSession = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const express = require('express');

const keys = require('./config/keys');
const env = require('./config/env');

//Load Routes 
const indexRoutes = require('./routes');
const authRoutes = require('./routes/auth');

const app = express();

//Map global promises
mongoose.Promise = Promise;

//Mongoose Connect
mongoose.connect(keys.mongo.URI)
    .then(() => console.log('Connected to DB...'))
    .catch(err => console.log(err));
mongoose.set('debug', true);

// Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Serve static files
app.use(express.static('public'));

//body-parsing middleware 
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// Passport config
app.use(expressSession({
    secret: keys.session.secret,
    resave: false,
    saveUninitialized: false,
}));

//Load Passport setup
require('./config/passport')(passport);

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

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

//Use Routes
app.use('/', indexRoutes);
app.use('/auth', authRoutes);


app.listen(env.PORT, () => console.log(`Server started on port ${env.PORT}`));