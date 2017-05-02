const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.get('db:host'));


mongoose.model('User', require('../models/user'));

module.exports = mongoose;
