const path = require('path');
const fs = require('fs');

const filePath = path.resolve(__dirname, '../mockSchedule.json');

const getBusStopInfo = (busStopId) => {
  const busStopInfo = {};
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const busStop = data.stop_names.find(busStop => busStop.id === busStopId);
  if(busStop) {
    busStopInfo.busStopId = busStop.id;
    busStopInfo.busStopName = busStop.name;

    const busStopBusesInfo = data.stops.filter(stop => stop.n_id === busStopId);
    busStopInfo.routes = busStopBusesInfo.map(busStopBusInfo => ({
      routeId: (data.routes.find(route => route.id === busStopBusInfo.r_id)).id,
      routeNumber: (data.routes.find(route => route.id === busStopBusInfo.r_id)).number,
      busStopName: busStop.name,
      busDirection: (data.directions.find(direction => direction.id === busStopBusInfo.d_id)).name,
      busNumber: (data.routes.find(route => route.id === busStopBusInfo.r_id)).number,
      schedule: busStopBusInfo.schedule,
    }));
  }

  return busStopInfo;
};

const getBusStops = (req, res, next) => {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const busStops = data.stop_names;
  return res.json(busStops);
};

const getBusStopSchedule = (req, res, next) => {
  const { busStopId } = req.params;
  if (!busStopId || !Number(busStopId)) {
    const notFoundError = new Error('Bad request. Expect valid bus stop id');
    notFoundError.statusCode = 404;
    return next(notFoundError);
  }

  const busStopInfo = getBusStopInfo(busStopId);

  res.json(busStopInfo)
};

const getBusStopRoute = (req, res, next) => {
  const { busStopId, routeId } = req.params;
  if (!busStopId || !Number(busStopId) || !routeId || !Number(routeId)) {
    const notFoundError = new Error('Bad request. Expect valid params');
    notFoundError.statusCode = 404;
    return next(notFoundError);
  }

  const busStopInfo = getBusStopInfo(busStopId);
  const busStopRoute = {
    busStopId: busStopInfo.busStopId,
    busStopName: busStopInfo.busStopName,
    route: busStopInfo.routes.find(route => route.routeId === routeId),
  };

  res.json(busStopRoute)
};

module.exports = {
  getBusStops,
  getBusStopSchedule,
  getBusStopRoute
};