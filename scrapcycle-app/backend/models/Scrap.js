const mongoose = require('mongoose');

const scrapSchema = new mongoose.Schema({
  category: String,
  subCategory: String,
  price: Number,
  location: String,
  weight: Number,
  image: String,  // File path for the uploaded image
});

const Scrap = mongoose.model('Scrap', scrapSchema);

module.exports = Scrap;
