const faker = require('faker');

module.exports = {
  routes: [
    {
      id: faker.random.uuid(),
      arrivalTime: '12 min',
      bustStopName: 'name1',
      points: [
        {
          id: faker.random.uuid(),
          name: 'name1',
        },
        {
          id: faker.random.uuid(),
          name: 'name2',
        },
        {
          id: faker.random.uuid(),
          name: 'name3',
        },
      ],
      geoJson: [
        {
          type: 'Feature',
          properties: {
            name: 'start point',
            type: 'start',
            popupContent: 'Some popup!',
          },
          geometry: {
            type: 'Point',
            coordinates: [23.79417658, 53.6729683],
          },
        },
        {
          type: 'Feature',
          properties: {
            name: 'bus stop',
            type: 'bus_stop',
            popupContent: 'Some popup!',
          },
          geometry: {
            type: 'Point',
            coordinates: [23.78851175, 53.66706981],
          },
        },
        {
          type: 'Feature',
          properties: {
            name: 'bus stop',
            type: 'bus_stop',
            popupContent: 'Some popup!',
          },
          geometry: {
            type: 'Point',
            coordinates: [23.78439188, 53.66429825],
          },
        },
        {
          type: 'Feature',
          properties: {
            name: 'bus stop',
            type: 'bus_stop',
            popupContent: 'Some popup!',
          },
          geometry: {
            type: 'Point',
            coordinates: [23.78190279, 53.65911062],
          },
        },
        {
          type: 'Feature',
          properties: {
            name: 'end point',
            type: 'end',
            popupContent: 'Some popup!',
          },
          geometry: {
            type: 'Point',
            coordinates: [23.78194571, 53.65791534],
          },
        },
        {
          type: 'Feature',
          properties: {
            name: 'Lines',
          },
          geometry: {
            type: 'LineString',
            coordinates: [
              [23.79417658, 53.6729683],
              [23.78851175, 53.66706981],
              [23.78439188, 53.66429825],
              [23.78190279, 53.65911062],
              [23.78194571, 53.65791534]],
          },
        }],
    },
    {
      id: faker.random.uuid(),
      arrivalTime: '5 min',
      bustStopName: 'name11',
      points: [
        {
          id: faker.random.uuid(),
          name: 'name11',
        },
        {
          id: faker.random.uuid(),
          name: 'name22',
        },
        {
          id: faker.random.uuid(),
          name: 'name31',
        },
      ],
      geoJson: [
        {
          type: 'Feature',
          properties: {
            name: 'start point',
            type: 'start',
            popupContent: 'Some popup!',
          },
          geometry: {
            type: 'Point',
            coordinates: [23.79417658, 53.6729683],
          },
        },
        {
          type: 'Feature',
          properties: {
            name: 'bus stop',
            type: 'bus_stop',
            popupContent: 'Some popup!',
          },
          geometry: {
            type: 'Point',
            coordinates: [23.78851175, 53.66706981],
          },
        },
        {
          type: 'Feature',
          properties: {
            name: 'bus stop',
            type: 'bus_stop',
            popupContent: 'Some popup!',
          },
          geometry: {
            type: 'Point',
            coordinates: [23.78439188, 53.66429825],
          },
        },
        {
          type: 'Feature',
          properties: {
            name: 'bus stop',
            type: 'bus_stop',
            popupContent: 'Some popup!',
          },
          geometry: {
            type: 'Point',
            coordinates: [23.78190279, 53.65911062],
          },
        },
        {
          type: 'Feature',
          properties: {
            name: 'end point',
            type: 'end',
            popupContent: 'Some popup!',
          },
          geometry: {
            type: 'Point',
            coordinates: [23.78194571, 53.65791534],
          },
        },
        {
          type: 'Feature',
          properties: {
            name: 'Lines',
          },
          geometry: {
            type: 'LineString',
            coordinates: [
              [23.79417658, 53.6729683],
              [23.78851175, 53.66706981],
              [23.78439188, 53.66429825],
              [23.78190279, 53.65911062],
              [23.78194571, 53.65791534]],
          },
        }],
    },
  ],
};
