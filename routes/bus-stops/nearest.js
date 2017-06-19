const express = require('express');
const fs = require('fs');
const path = require('path');

const utils = require('../../utils');

exports.get = ((req, res, next) => {
  const { lat, lon, distance } = req.query;
  console.log(lat, lon, distance)
  return fs.readFile(path.resolve(__dirname, 'geo.json'), 'utf-8', (err, data) => {
    if (err) {
      const readFileError = new Error(err.message || 'Some error with readFile');
      readFileError.statusCode = err.statusCode || 403;
      return next(readFileError);
    }
    const busStops = JSON.parse(data).busStopsGeo;
    const nearestBusStops = busStops.filter(busStop =>
      utils.getDistanceFromLatLonInMeters(lat, lon, busStop.lat, busStop.lng) <= distance
    )
    console.log(nearestBusStops.length);

    return res.json(nearestBusStops);
  });
});