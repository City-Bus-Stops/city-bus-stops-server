const express = require('express');
const router = express.Router();
const passport = require('passport');
const validate = require('../src/validation');

router.post('/signup', (req, res, next) => {
  const validationResult = validate.SignUpForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      title: validationResult.title,
      errors: validationResult.errors,
    });
  }

  passport.authenticate('local-signup', (err) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        // the 11000 Mongo code is for duplicate email error
        // the 409 HTTP status code is for conflict error
        return res.status(409).json({
          success: false,
          title: 'Check the form for errors.',
          errors: { email: 'This email is already taken.' },
        });
      }

      return res.status(400).json({
        success: false,
        title: 'Could not process the form.',
      });
    }

    return res.status(200).json({
      success: true,
      title: 'You have successfully signed up! Now you should be able to log in.',
    });
  })(req, res, next);
});

router.post('/login', (req, res, next) => {
  const validationResult = validate.LoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      title: validationResult.title,
      errors: validationResult.errors,
    });
  }

  passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json(
          { success: false, errors: { AutheticationError: err.message } }
        );
      }

      return res.status(400).json({
        success: false,
        errors: { AutheticationError: 'Could not process the form.' },
      });
    }
    return res.json({
      success: true,
      title: 'You have successfully logged in!',
      token,
      user: userData,
    });
  })(req, res, next);
});

module.exports = router;
