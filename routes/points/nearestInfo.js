const express = require('express');
const fs = require('fs');
const path = require('path');

exports.get = ((req, res, next) => {
  const lat = parseFloat(req.query.lat);
  const lon = parseFloat(req.query.lon);
  const distance = Number(req.query.distance) || 1000;
  if (!lat || !lon) {
    const paramsError = new Error('Bad request');
    paramsError.statusCode = 400;
    return next(paramsError);
  }
  return fs.readFile(path.resolve(__dirname, 'nearestInfoMock.json'), 'utf-8', (err, data) => {
    if (err) {
      const readFileError = new Error(err.message || 'Some error with readFile');
      readFileError.statusCode = err.statusCode || 403;
      return next(readFileError);
    }
    const parseString = JSON.parse(data).nearestBusStops;
    return res.json(parseString);
  });
});
