const express = require('express');
const fs = require('fs');
const path = require('path');

exports.get = ((req, res, next) => {
  const { startPoint, endPoint } = req.query;
  return fs.readFile(path.resolve(__dirname, 'path.json'), 'utf-8', (err, data) => {
    if (err) {
      const readFileError = new Error(err.message || 'Some error with readFile');
      readFileError.statusCode = err.statusCode || 403;
      return next(readFileError);
    }
    const path = JSON.parse(data).path;
    return res.json(path);
  });
});
