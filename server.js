const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const nconf = require('./config');
const passport = require('passport');
const cors = require('cors');
require('./services/mongoose');

const port = nconf.get('port');
const app = express();

app.use(bodyParser.json());

app.use(passport.initialize());

// enable CORS - Cross Origin Resource Sharing(credentials - cookie + auth)
app.use(cors({ credentials: true, origin: true }));

// Passport strategy
require('./passport')(nconf.get('local-strategy'), nconf.get('jwt-secret'));

app.use('/', routes);

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(err.statusCode || 500);
  res.send(err.message || 'Internal Server Error');
});

app.listen((port), (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`Server listen on port: ${port}`);
  }
});

module.export = app;
