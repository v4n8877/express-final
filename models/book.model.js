const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  des: String,
  image: String
});

const Book = mongoose.model('Book', bookSchema, 'books');

module.exports = Book;