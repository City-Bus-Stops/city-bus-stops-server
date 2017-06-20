const express = require('express');

const router = express.Router();

const info = require('./info');
const favorite = require('./favorite');

router.get('/info', info.get);
router.get('/favorites', favorite.get);

module.exports = router;
