const express = require('express');

const router = express.Router();

const geo = require('./geo');
const nearest = require('./nearest');

router.get('/nearest/geo', nearest.get);
router.get('/:id/geo', geo.get);

module.exports = router;
