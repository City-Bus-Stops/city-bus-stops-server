const express = require('express');

const router = express.Router();

const info = require('./info');

router.use('/:id/info', info.get);

module.exports = router;
