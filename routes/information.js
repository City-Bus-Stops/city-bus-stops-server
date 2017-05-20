const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send('Hi! This is city-bus-stops server side.' +
    'You can look at <a href="https://github.com/City-Bus-Stops/city-bus-stops-server">github</a> ' +
    'for more information.'
  );
});

module.exports = router;
