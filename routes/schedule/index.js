const express = require('express');

const router = express.Router();

const busStops = require('./bus-stops');
const routes = require('./routes');

router.use('/bus-stops', busStops);
router.use('/routes', routes);

module.exports = router;
