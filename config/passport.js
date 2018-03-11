const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');

module.exports = (passport) => {
  passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
  },
    (accessToken, refreshToken, profile, callback) => {
      console.log(accessToken);
      console.log(profile);
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return callback(err, user);
      // });
    }
  ));
}