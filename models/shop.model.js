const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  storeId: String,
  items: [{bookId: String}] ,
});

const Shop = mongoose.model('Shop', shopSchema, 'shops');

module.exports = Shop;