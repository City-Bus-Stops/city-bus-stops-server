const jwt = require('jsonwebtoken');
const User = require('../services/mongoose').model('User');

module.exports = (jwtSecret) => {
  /**
   * Return the middleware function.
   */
  return (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(403).end('User not authenticated');
    }
    // get the last part from a authorization header string like "bearer token-value"
    const token = req.headers.authorization.split(' ')[0];
    // decode the token using a secret key-phrase
    jwt.verify(token, jwtSecret, (err, decoded) => {
      // the 401 code is for unauthorized status
      if (err) { return res.status(401).end(); }
      const userId = decoded.sub;
      // check if a user exists
      User.findById(userId, (err, user) => {
        if (err || !user) {
          return res.status(401).end();
        }
        req.isAdmin = user && user.userRole === 'ADMIN';
        return next();
      });
    });
  };
};
