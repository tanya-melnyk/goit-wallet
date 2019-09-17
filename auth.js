const config = require('./config');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const passport = require('passport');

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
