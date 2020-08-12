const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean,
  wrongLoginCount: Number
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;