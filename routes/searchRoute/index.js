const express = require('express');
const fs = require('fs');
const path = require('path');

exports.get = ((req, res, next) => {
  const { from, to } = req.query;
  if (!from || !to) {
    const bodyError = new Error('Bad request');
    bodyError.statusCode = 400;
    return next(bodyError);
  }

  fs.createReadStream(path.resolve(__dirname, 'mock-routes.json')).pipe(res);
});
