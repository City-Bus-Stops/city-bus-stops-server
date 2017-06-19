const express = require('express');
const fs = require('fs');
const path = require('path');

exports.get = ((req, res, next) => {
  const id = Number(req.params.id);
  console.log('Route id: ', id);
  if (!id || !Number(id)) {
    const paramsError = new Error('Bad request');
    paramsError.statusCode = 400;
    return next(paramsError);
  }
  return fs.readFile(path.resolve(__dirname, 'mock.json'), 'utf-8', (err, data) => {
    if (err) {
      const readFileError = new Error(err.message || 'Some error with readFile');
      readFileError.statusCode = err.statusCode || 403;
      return next(readFileError);
    }
      const routeInfo = JSON.parse(data).routeInfo;
      return res.json(routeInfo);
  });
});
