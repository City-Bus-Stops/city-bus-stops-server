const express = require('express');
const router = express.Router();

const nconf = require('../config');
const authCheckMiddleware = require('../middlewares/auth-check');

router.use('/route', require('./searchRoute'));
router.use('/auth', require('./auth'));
router.use('/api', require('./api'), authCheckMiddleware(nconf.get('jwt-secret')));
router.use('/location', require('./userLocation/location').get);
router.use('/address', require('./userLocation/address-router').get);
router.use('/bus-schedule/:id', require('./busSchedule').get);

module.exports = router;
