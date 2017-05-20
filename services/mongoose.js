const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(process.env.MONGODB_URI || config.get('db:host'));

mongoose.model('User', require('../models/user'));

module.exports = mongoose;
