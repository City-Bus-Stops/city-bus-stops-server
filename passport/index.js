const passport = require('passport');

module.exports = (config, jwtSecret) => {
  // loading strategies
  const localSignupStrategy = require('./local-signup')(config);
  const localLoginStrategy = require('./local-login')(config, jwtSecret);
  passport.use('local-signup', localSignupStrategy);
  passport.use('local-login', localLoginStrategy);
};
