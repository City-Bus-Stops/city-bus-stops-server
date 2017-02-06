const fakeData = require('./mock-points');

function get(req, res, next) {
  console.log('Requser params: ', req.params);
  console.log(`Request query: ${JSON.stringify(req.query)}`);
  setTimeout(() => {
    return res.send({
      id: req.params.id,
      points: fakeData.points
    })
  }, 3000);

  /***
   Error code style

   res.status(400).json({
    errors: { NotFount: 'No buses on this bus stop' },
  });
   ***/
}

module.exports = {
  get,
};
