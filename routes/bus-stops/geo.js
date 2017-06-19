const express = require('express');
const fs = require('fs');
const path = require('path');

exports.get = ((req, res, next) => {
  const id = +req.params.id;
  if (!id || !Number(id)) {
    const paramsError = new Error('Bad request');
    paramsError.statusCode = 400;
    return next(paramsError);
  }
  return fs.readFile(path.resolve(__dirname, 'geo.json'), 'utf-8', (err, data) => {
    if (err) {
      const readFileError = new Error(err.message || 'Some error with readFile');
      readFileError.statusCode = err.statusCode || 403;
      return next(readFileError);
    }
    const busStopsGeo = JSON.parse(data).busStopsGeo;
    const busStopGeo = busStopsGeo.find(busStop => busStop.id === id);

    if (busStopGeo === undefined) {
      const notFoundError = new Error('Bus stop not found');
      notFoundError.statusCode = 404;
      return next(notFoundError);
    }
    return res.json(busStopGeo);
  });
});
