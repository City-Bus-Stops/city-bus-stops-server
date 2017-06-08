const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const passportLocalStrategy = require('passport-local').Strategy;

module.exports = (config, jwtSecret) => {
  /**
   * Return the Passport Local Strategy object.
   */
  return new passportLocalStrategy(config, (req, email, password, done) => {
    const userData = {
      email: email.trim(),
      password: password.trim(),
    };
    // find a user by email address
    User.findOne({ email: userData.email }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        const error = new Error('Incorrect email or password');
        error.name = 'Incorrect Credentials Error';
        return done(error);
      }
      // check if a hashed user's password is equal to a value saved in the database
      user.comparePassword(userData.password, (err, isMatch) => {
        if (err) { return done(err); }
        if (!isMatch) {
          const error = new Error('Incorrect email or password');
          error.name = 'Incorrect Credentials Error';
          return done(error);
        }
        const payload = {
          sub: user._id,
        };
        // create a token string
        const token = jwt.sign(payload, jwtSecret);
        const userData = {
          username: user.username,
          userRole: user.userRole,
          userId: user._id,
        };
        return done(null, token, userData);
      });
    });
  });
};
