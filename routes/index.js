const express = require('express');
const router = express.Router();

// const nconf = require('../config');
// const authCheckMiddleware = require('../middlewares/auth-check');
//
// authCheckMiddleware(nconf.get('jwt-secret'));

const api = require('./api');
const information = require('./information');

router.use('/', information);
router.use('/api', api);

module.exports = router;
