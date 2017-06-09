const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// define the User model schema
const UserSchema = new mongoose.Schema({
  email: { type: String, index: { unique: true } },
  password: String,
  username: String,
  userRole: String,
});

UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, callback);
};


/**
 * The pre-save hook method.
 */
UserSchema.pre('save', function (next) {
  const user = this;
  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();
  bcrypt.genSalt((err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err); }
      // replace a password string with hash value
      user.password = hash;
      return next();
    });
  });
});

module.exports = UserSchema;
