const express = require('express');
const router = express.Router();
const controller = require('./routes');

router.route('/searchRoute').get(controller.get);

module.exports = router;
