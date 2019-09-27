const config = require('../config');
const passport = require('passport');

const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

// Passport strategy for authenticating with Facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: config.facebook.clientId,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callback,
      scope: config.facebook.scopes,
    },
    function(accessToken, refreshToken, profile, done) {
      done(null, profile);
    },
  ),
);

// Passport strategy for authenticating with Google
passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.clientId,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callback,
      passReqToCallback: true,
      scope: config.google.scopes,
    },
    function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    },
  ),
);

// Passport strategy for authenticating with LinkedIn
passport.use(
  new LinkedInStrategy(
    {
      clientID: config.linkedIn.clientId,
      clientSecret: config.linkedIn.clientSecret,
      callbackURL: config.linkedIn.callback,
      scope: config.linkedIn.scopes,
    },
    function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
    },
  ),
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(id);
});

module.exports = passport;
