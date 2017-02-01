const express = require('express');
const router = express.Router();
const controller = require('./routes');

router.route('/searchRoute').post(controller.post);

module.exports = router;
