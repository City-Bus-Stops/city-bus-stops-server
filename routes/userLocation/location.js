/*
  req.body.lat - latitude
  req.body.lon - longitude
  response - user address
 */
const _ = require('lodash');
const request = require('request');

exports.get = ((req, res, next) => {
  const nameOfLocation = req.query.name;
  let basicSearchPoint = req.query.base;
  if (!nameOfLocation) {
    const queryError = new Error('Bad request. Query "name" is not found or missing');
    queryError.status = 400;
    return next(queryError);
  }
  if (!basicSearchPoint) {
    basicSearchPoint = 'Гродно';
  }
  const queryString = `${nameOfLocation}, ${basicSearchPoint}`;
  const queryURL = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(queryString)}
  &format=json`;
  request(queryURL, (err, response, data) => {
    if (err) return next(err);
    if (response.statusCode !== 200) {
      const requestError = new Error('Search returns Not Found');
      requestError.status = 404;
      return next(requestError);
    }
    const parseJSONData = JSON.parse(data);
    const result = _
            .chain(parseJSONData)
            .map((o) => { // eslint-disable-line arrow-body-style
              return {
                name: o.display_name,
                lat: o.lat,
                lon: o.lon,
              };
            })
            .valueOf();
    return res.send(result);
  });
});
