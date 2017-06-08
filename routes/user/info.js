const express = require('express');
const fs = require('fs');
const path = require('path');

exports.get = ((req, res, next) => {
  const lat = parseFloat(req.query.lat);
  const lon = parseFloat(req.query.lon);
  if (!Number(lat) || !Number(lon)) {
    const numberError = new Error('Query params is not a Number or query is not found or missing');
    numberError.statusCode = 400;
    return next(numberError);
  }
  return fs.readFile(path.resolve(__dirname, 'userInfo.json'), 'utf-8', (err, data) => {
    if (err) {
      const readFileError = new Error(err.message || 'Some error with readFile');
      readFileError.statusCode = err.statusCode || 403;
      return next(readFileError);
    }
    const parseString = JSON.parse(data).userInfo;

    return res.json(parseString);
  });
});
