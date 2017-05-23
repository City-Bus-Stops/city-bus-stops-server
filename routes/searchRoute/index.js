const express = require('express');
const mockData = require('./mock-routes.json');
const fs = require('fs');
const path = require('path');

exports.post = ((req, res, next) => {
  const from = req.body.from;
  const to = req.body.to;
  if (!from || !to) {
    const bodyError = new Error('Bad request');
    bodyError.statusCode = 400;
    return next(bodyError);
  }

  fs.createReadStream(path.resolve(__dirname, 'mock-routes.json')).pipe(res);
});

