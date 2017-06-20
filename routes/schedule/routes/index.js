const express = require('express');
const routesService = require('./routesService');

const router = express.Router();

router.get('/', routesService.getRoutes);
router.get('/:routeId', routesService.getRoute);

module.exports = router;