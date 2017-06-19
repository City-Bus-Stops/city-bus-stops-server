const request = require('request');

exports.get = ((req, res, next) => {
  const lat = parseFloat(req.query.lat);
  const lon = parseFloat(req.query.lon);
  if (!Number(lat) || !Number(lon)) {
    const numberError = new Error('Query params is not a Number or query is not found or missing');
    numberError.statusCode = 400;
    return next(numberError);
  }
  const queryString = `${lat}, ${lon}`;
  const queryURL = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(queryString)}
  &format=json`;
  return request(queryURL, (err, response, data) => {
    if (err) return next(err);
    const parsedJSONData = JSON.parse(data);
    if (response.statusCode !== 200 || parsedJSONData.length === 2) {
      const requestError = new Error('Search returns Not Found');
      requestError.status = 404;
      return next(requestError);
    }
    const result = parsedJSONData
      .map(location => location.display_name.match(/.*(Гродно|Hrodno)/g, "")[0] || location.display_name)
    return res.send({
      address: result[0],
    });
  });
});
