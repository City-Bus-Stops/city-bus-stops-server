const User = require('mongoose').model('User');
const passportLocalStrategy = require('passport-local').Strategy;


module.exports = (config) => {
  /**
   * Return the Passport Local Strategy object.
   */
  return new passportLocalStrategy(config, (req, email, password, done) => {
    const userData = {
      email: email.trim(),
      password: password.trim(),
      name: req.body.name.trim(),
    };
    const newUser = new User(userData);
    newUser.save((err) => {
      if (err) { return done(err); }
      return done(null);
    });
  });
};
