const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  subCategory: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Warehouse', warehouseSchema); 