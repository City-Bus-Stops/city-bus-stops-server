const express = require('express');
const fs = require('fs');
const path = require('path');
const faker = require('faker');

const fakeBuses = [
  {
    "id": "1",
    "number": "23",
    "time": "15",
    "startPoint": "КСМ",
    "endPoint": "Химволокно"
  },
  {
    "id": "2",
    "number": "3",
    "time": "7",
    "startPoint": "Девятовка",
    "endPoint": "Фолюш"
  },
  {
    "id": "3",
    "number": "28",
    "time": "19",
    "startPoint": "Девятовка",
    "endPoint": "Химволокно"
  },
  {
    "id": "4",
    "number": "23",
    "time": "6",
    "startPoint": "Колбасино",
    "endPoint": "Вишневец"
  }
]

exports.get = ((req, res, next) => {
  const id = Number(req.params.id);
  const { lat, lon }  = req.query;
  if (!id || !Number(id)) {
    const paramsError = new Error('Bad request');
    paramsError.statusCode = 400;
    return next(paramsError);
  }
  const busStopsGeo = JSON.parse(fs.readFileSync('routes/bus-stops/geo.json', 'utf-8')).busStopsGeo;
  const busStop = busStopsGeo.find(busStop => busStop.id === id)
  return res.json(busStop === undefined ?
    {
      id: faker.random.uuid(),
      name: faker.address.streetName(),
      address: faker.address.streetAddress(),
      coords: [Number(lat), Number(lon)],
    } :
    {
      id: busStop.id,
      isSaved: faker.random.boolean(),
      name: faker.address.streetName(),
      address: faker.address.streetAddress(),
      coords: [busStop.lat, busStop.lng],
      type: busStop.type,
      buses: fakeBuses,
    }
  );
});
