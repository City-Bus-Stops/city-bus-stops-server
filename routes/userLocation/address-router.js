const _ = require('lodash');
const request = require('request');

exports.get = ((req, res, next) => { // eslint-disable-line consistent-return
  const lat = parseFloat(req.query.lat);
  const lon = parseFloat(req.query.lon);
  if (!Number(lat) || !Number(lon)) {
    const numberError = new Error('Query params is not a Number or query is not found or missing');
    numberError.statusCode = 401;
    return next(numberError);
  }
  const queryString = `${lat}, ${lon}`;
  const queryURL = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(queryString)}
  &format=json`;
  request(queryURL, (err, response, data) => {
    if (err) return next(err);
    if (response.statusCode !== 200 || data.length === 2) {
      const requestError = new Error('Search returns Not Found');
      requestError.status = 404;
      return next(requestError);
    }
    const parseJSONData = JSON.parse(data);
    const result = _
      .chain(parseJSONData)
      .map((o) => { // eslint-disable-line arrow-body-style
        return {
          address: o.display_name,
        };
      })
      .valueOf();
    return res.send(result);
  });
});
