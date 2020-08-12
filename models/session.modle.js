const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  name: String,
});

const Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;