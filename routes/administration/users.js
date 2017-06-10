const express = require('express');
const fs = require('fs');
const User = require('../../services/mongoose').model('User');
const validate = require('../../src/validation');

exports.get = ((req, res, next) => {
  if (!req.isAdmin) {
    return res.status(403).end('This user is not an administrator')
  }
  User.find({}, (err, users) => {
    res.json(users);
  });
});

exports.post = ((req, res, next) => {
  if (!req.isAdmin) {
    return res.status(403).end('This user is not an administrator')
  }
  const validationResult = validate.registrationForm(req.body);
  if (validationResult) {
    return res.status(400).json(validationResult);
  }
  const { userRole, email, password, username } = req.body;
  if (userRole !== 'USER' && userRole !== 'ADMIN') {
    return res.status(400).json({ userRole: ['Valid only ADMIN or USER'] });
  }

  const userData = {
    email: email.trim(),
    password: password.trim(),
    username: username.trim(),
    userRole,
  };

  const newUser = new User(userData);
  newUser.save((err) => {
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
    return res.status(204);
  });
});
