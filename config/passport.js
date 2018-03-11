const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/user');
const keys = require('./keys');

module.exports = (passport) => {
  passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
  },
    (accessToken, refreshToken, profile, done) => {
      let newUser = {
        googleID: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        img: profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?')),
      }
      User.findOne({googleID:profile.id})
      .then((user)=>{
        if(!user){
        User.create(newUser)
        .then(user => { done(null, user) })
        .catch(err => console.log(err));
        }else{
          done(null, user)
        }
      })
      .catch(err => console.log(err));
    }
  ));

  passport.serializeUser((user, done)=> done(null, user.id));
  passport.deserializeUser((id, done)=> {
    User.findById(id)
    .then(user => done(null, user))
    .catch(err =>console.log(err));
  })

}