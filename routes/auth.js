const express = require('express');
const router = express.Router();
const passport = require('passport');
const validate = require('../src/validation');

router.post('/signup', (req, res, next) => {
  const validationResult = validate.SignUpForm(req.body);
  if (validationResult) {
    return res.status(400).json(validationResult);
  }

  passport.authenticate('local-signup', (err) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        // the 11000 Mongo code is for duplicate email error
        // the 409 HTTP status code is for conflict error
        return res.status(409).json({
          error: {
            message: 'This email is already taken',
          }
        });
      }

      return res.status(400).json({
        error: {
          message: 'Could not process the form.',
        },
      });
    }

    return res.status(204).send();
  })(req, res, next);
});

router.post('/login', (req, res, next) => {
  const validationResult = validate.LoginForm(req.body);
  if (validationResult) {
    return res.status(400).json(validationResult);
  }

  passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'Incorrect Credentials Error') {
        return res.status(400).json(
          {
            error: {
              message: err.message,
            },
          }
        );
      }

      return res.status(400).json({
        error: {
          message: 'Could not process the form.',
        },
      });
    }
    res.set('Authorize', token);
    return res.send({
      userData,
    });
  })(req, res, next);
});

module.exports = router;
