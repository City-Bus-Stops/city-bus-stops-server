const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const filePath = path.resolve(__dirname, '../mockSchedule.json');


const getRouteInfo = (routeId) => {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const routeNumber = (data.routes.find(route => route.id === routeId)).number;
  const groupedRouteDirections = _.groupBy(data.stops.filter(stop => stop.r_id === routeId), 'd_id');
  const routeDirections = _.map(groupedRouteDirections, (routeDirectionBusStops, key) => ({
    directionId: key,
    directionName: (data.directions.find(direction => direction.id === key)).name,
    busStops: routeDirectionBusStops.map(routeBusStop => data.stop_names.find(busStop => busStop.id === routeBusStop.n_id))
  }));

  return {
    routeId,
    routeNumber,
    directions: routeDirections,
  };
};

const getRoutes = (req, res, next) => {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const busRoutes = data.routes.filter(route => route.type === "0");
  return res.json(busRoutes);
};

const getRoute = (req, res, next) => {
  const { routeId } = req.params;
  if (!routeId || !Number(routeId)) {
    const notFoundError = new Error('Bad request. Expect valid route id.');
    notFoundError.statusCode = 404;
    return next(notFoundError);
  }


  const routeBusStops = getRouteInfo(routeId);
  return res.json(routeBusStops);
};

module.exports = {
  getRoutes,
  getRoute
};