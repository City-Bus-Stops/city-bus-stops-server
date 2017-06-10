const express = require('express');

const router = express.Router();

const users = require('./users');

router.get('/users', users.get);
router.post('/users', users.post);
// router.delete('/users/:id', users.delete);

module.exports = router;
