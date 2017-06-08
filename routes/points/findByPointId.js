const express = require('express');
const fs = require('fs');
const path = require('path');

exports.get = ((req, res, next) => {
  const id = Number(req.params.id);
  if (!id || (id && !Number(id))) {
    const paramsError = new Error('Bad request');
    paramsError.statusCode = 400;
    return next(paramsError);
  }
  return fs.readFile(path.resolve(__dirname, 'findByPointMock.json'), 'utf-8', (err, data) => {
    if (err) {
      const readFileError = new Error(err.message || 'Some error with readFile');
      readFileError.statusCode = err.statusCode || 403;
      return next(readFileError);
    }
    const parseString = JSON.parse(data).pointsInfo;
    const findRoute = parseString.filter(route => route.id === id);

    if (Object.keys(findRoute).length === 0 && typeof findRoute === "object") {
      const notFoundError = new Error('This route is Not Found');
      notFoundError.statusCode = 404;
      return next(notFoundError);
    }
    return res.json(findRoute);
  });
});
