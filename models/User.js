const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  first_name: String,
  last_name: String,
  username: String,
  email: String,
  password: String,
  valid: Boolean,
  login_attempts: Number,
  confirmation_code: String,
  requested_password_change: Boolean,
  password_change_code: String
});

module.exports = mongoose.model('user', User);
