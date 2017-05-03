const faker = require('faker');

module.exports = {
  points: [
    {
      id: faker.random.uuid(),
      name: 'name1',
      time: '2 min'
    },
    {
      id: faker.random.uuid(),
      name: 'name2',
      time: '13 min'
    },
    {
      id: faker.random.uuid(),
      name: 'name3',
      time: '40 min'
    },
  ]
};
