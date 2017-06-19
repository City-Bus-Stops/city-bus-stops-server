const express = require('express');
const busStopsService = require('./busStopsService');

const router = express.Router();

router.get('/', busStopsService.getBusStops);
router.get('/:busStopId/routes', busStopsService.getBusStopSchedule);
router.get('/:busStopId/routes/:routeId', busStopsService.getBusStopRoute);

module.exports = router;