const express = require('express');
const router = express.Router();

const location = require('./userLocation/location');
const address = require('./userLocation/address-router');
const auth = require('./auth');
const searchRoute = require('./searchRoute/index');
const routes = require('./routes');

router.use('/auth', auth);
router.use('/routes', routes);

router.get('/location', location.get);
router.get('/address', address.get);

router.post('/search-route', searchRoute.post);

module.exports = router;
