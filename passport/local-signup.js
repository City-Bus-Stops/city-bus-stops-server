const User = require('../services/mongoose').model('User');
const passportLocalStrategy = require('passport-local').Strategy;


module.exports = (config) => {
  /**
   * Return the Passport Local Strategy object.
   */
  return new passportLocalStrategy(config, (req, email, password, done) => {
    const userData = {
      email: email.trim(),
      password: password.trim(),
      username: req.body.name.trim(),
      userRole: 'USER',
    };
    const newUser = new User(userData);
    newUser.save((err, userData) => {
      if (err) { return done(err); }
      return done(null);
    });
  });
};
