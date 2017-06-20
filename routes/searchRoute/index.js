const express = require('express');
const fs = require('fs');
const path = require('path');

exports.get = ((req, res, next) => {
  const { from, to } = req.query;
  console.log(from, to);
  if (!from || !to) {
    const bodyError = new Error('Bad request');
    bodyError.statusCode = 400;
    return next(bodyError);
  }

  const mockRoutes = (JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mock-routes.json')).toString())).routes;
  console.log(mockRoutes)
  res.send(mockRoutes.map(route => {
    const newRoute = route;
    newRoute.from = from;
    newRoute.to = to;
    return newRoute;
  }))

});
