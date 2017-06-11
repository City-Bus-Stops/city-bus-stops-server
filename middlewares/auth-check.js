const jwt = require('jsonwebtoken');
const User = require('../services/mongoose').model('User');

module.exports = (jwtSecret) => {
  /**
   * Return the middleware function.
   */
  return (req, res, next) => {
    if (!req.headers.authorization) {
      const error = new Error('User not authenticated');
      error.statusCode = 403;
      return next(error);
    }
    // get the last part from a authorization header string like "bearer token-value"
    const token = req.headers.authorization.split(' ')[0];
    // decode the token using a secret key-phrase
    jwt.verify(token, jwtSecret, (err, decoded) => {
      // the 401 code is for unauthorized status
      if (err) {
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        return next(error);
      }
      const userId = decoded.sub;
      // check if a user exists
      User.findById(userId, (err, user) => {
        if (err || !user) {
          const error = new Error('Unauthorized');
          error.statusCode = 401;
          return next(error);
        }
        req.isAdmin = user && user.userRole === 'ADMIN';
        return next();
      });
    });
  };
};
