const express = require('express');

const router = express.Router();

const info = require('./info');

router.get('/info', info.get);

module.exports = router;
