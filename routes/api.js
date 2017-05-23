const express = require('express');
const router = express.Router();

const location = require('./userLocation/location');
const address = require('./userLocation/address-router');
const busSchedule = require('./busSchedule');
const auth = require('./auth');
const searchRoute = require('./searchRoute/index');

router.use('/auth', auth);

router.get('/location', location.get);
router.get('/address', address.get);
router.get('/bus-schedule/:id', busSchedule.get);

router.post('/search-route', searchRoute.post);

module.exports = router;
