const methodOverride = require('method-override');
const expressSession = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const express = require('express');
const path = require('path');

const {session} = require('./config/keys');
const {PORT, mongo} = require('./config/env');

//Handlebars Helpers
const {
    truncate, 
    formatDate,
    fromNow,
    select,
    editIcon,
} = require('./middleware/hbs');

//Load Routes 
const indexRoutes = require('./routes');
const authRoutes = require('./routes/auth');
const storiesRoutes = require('./routes/stories');
const commentsRoutes = require('./routes/comments');
const usersRoutes = require('./routes/users');

const app = express();

//Map global promises
mongoose.Promise = Promise;

//Mongoose Connect
mongoose.connect(mongo.URI)
    .then(() => console.log('Connected to DB...'))
    .catch(err => console.log(err));
mongoose.set('debug', true);

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Handlebars middleware
app.engine('handlebars', exphbs({
    helpers:{
        truncate: truncate,
        formatDate: formatDate,
        fromNow: fromNow,
        select: select,
        editIcon: editIcon,
    },
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Serve static files
// app.use(express.static('public'));
app.use('/static', express.static(path.join(__dirname, 'public')));

//body-parsing middleware 
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Passport config
app.use(expressSession({
    secret: session.secret,
    resave: false,
    saveUninitialized: false,
}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

//Load Passport setup
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

//Use Routes
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/stories', storiesRoutes);
app.use('/stories/:story_id/comments', commentsRoutes);
app.use('/stories/:story_id/users', usersRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));