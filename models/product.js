const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  searchQuery: {
    type: String,
  },
  sortType: {
    type: String,
  },
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
  },
  total_review_count: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  price: {
    type: String,
  },
  website: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);