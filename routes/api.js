const express = require('express');
const router = express.Router();

const location = require('./userLocation/location');
const address = require('./userLocation/address-router');
const busSchedule = require('./busSchedule');

router.get('/dashboard', (req, res) => { // for test login with postman
  return res.status(200).json({
    message: "You're authorized to see this secret message.",
  });
});

router.get('/location', location.get);
router.get('/address', address.get);
router.get('/bus-schedule/:id', busSchedule.get);

module.exports = router;
