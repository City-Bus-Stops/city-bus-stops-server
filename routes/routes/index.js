const express = require('express');

const router = express.Router();

const info = require('./info');
const geo = require('./geo');

router.use('/:id/info', info.get);
router.use('/:id/geo', geo.get);

module.exports = router;
