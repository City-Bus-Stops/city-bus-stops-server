const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth-check');
const nconf = require('../config');

const location = require('./userLocation/location');
const address = require('./userLocation/address-router');
const auth = require('./auth');
const searchRoute = require('./searchRoute/index');
const routes = require('./routes');
const points = require('./points');
const user = require('./user');
const busStops = require('./bus-stops');
const administration = require('./administration');

router.use('/auth', auth);
router.use('/routes', routes);
router.use('/points', points);
router.use('/user' , user);
router.use('/bus-stops' , busStops);
router.use('/administration', authMiddleware(nconf.get('jwt-secret')), administration);

router.get('/location', location.get);
router.get('/address', address.get);

router.get('/search-route', searchRoute.get);

module.exports = router;
