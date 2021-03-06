const express = require('express');

const router = express.Router();

const id = require('./findByPointId');

router.get('/:id/info', id.get);

module.exports = router;
