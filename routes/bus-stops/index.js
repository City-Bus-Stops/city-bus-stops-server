const express = require('express');

const router = express.Router();

const geo = require('./geo');

router.get('/:id/geo', geo.get);

module.exports = router;
