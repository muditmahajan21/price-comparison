const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  total_review_count: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  price: {
    type: Number,
    required: true
  },
  website: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);