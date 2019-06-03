const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// this variable type is Users
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(new GoogleStrategy(
  {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleID: profile.id })
      .then(existingUser => {
        if (existingUser) {
          // we already have a record
          // first argument is the error
          done(null, existingUser);
        } else {
          // make a new record
          new User({ googleID: profile.id }).save()
            .then(user => done(null, user));
        }
      });
  })
);