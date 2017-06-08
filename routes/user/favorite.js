const express = require('express');
const fs = require('fs');
const path = require('path');

exports.get = ((req, res, next) => {
  return fs.readFile(path.resolve(__dirname, 'favorite.json'), 'utf-8', (err, data) => {
    if (err) {
      const readFileError = new Error(err.message || 'Some error with readFile');
      readFileError.statusCode = err.statusCode || 403;
      return next(readFileError);
    }
    const parseString = JSON.parse(data).userFavorites;

    return res.json(parseString);
  });
});
