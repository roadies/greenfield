const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Users } = require('./database/db');
require('dotenv').config();


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:8080/google/callback',
},
  ((accessToken, refreshToken, profile, done) => {
    Users.findOrCreate({where: {googleId: profile.id, name: profile.displayName}})
      .then(user => {
        done(null, user[0]);
      })
  }
  )));
