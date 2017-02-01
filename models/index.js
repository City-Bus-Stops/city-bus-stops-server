const mongoose = require('mongoose');

module.exports = (db) => {
  mongoose.connect(db, (err) => {
    if (err) { throw err; }
  });
  require('./user');
};
