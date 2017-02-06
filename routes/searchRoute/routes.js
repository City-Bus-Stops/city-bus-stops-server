const fakeData = require('./mock-routes');

function get(req, res, next) {
  console.log(`Request query: ${JSON.stringify(req.query)}`);
  return res.send(fakeData.routes);
}

module.exports = {
  get,
};
