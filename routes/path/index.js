const express = require('express');

const router = express.Router();

const path = require('./path');

router.use('/', path.get);

module.exports = router;
