const fakeData = require('./mock-routes');

function post(req, res, next) {
  console.log(`Request body: ${JSON.stringify(req.body)}`);
  res.send(fakeData.routes);
  return next();
}

module.exports = {
  post,
};
