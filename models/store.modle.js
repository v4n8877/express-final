const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  userId: String,
  name: String,
  icon: String,
});

const Store = mongoose.model('Shop', storeSchema, 'stores');

module.exports = Store;