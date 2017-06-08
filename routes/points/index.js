const express = require('express');

const router = express.Router();

const id = require('./findByPointId');
const info = require('./nearestInfo');

router.get('/:id', id.get);
router.get('/nearest/info', info.get);

module.exports = router;
