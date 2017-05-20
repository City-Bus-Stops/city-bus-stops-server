const express = require('express');
const router = express.Router();

const nconf = require('../config');
const authCheckMiddleware = require('../middlewares/auth-check');

const api = require('./api');
const auth = require('./auth');
const information = require('./information');

router.use('/', information);
router.use('/auth', auth);
router.use('/api', authCheckMiddleware(nconf.get('jwt-secret')), api);

module.exports = router;
