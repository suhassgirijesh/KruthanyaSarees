const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: [
      'Silk Sarees',
      'Cotton Sarees',
      'Wedding Sarees',
      'Designer Sarees',
      'Party Wear Sarees',
      'Traditional Sarees'
    ],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  fabricType: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  size: [{
    type: String,
    enum: ['One Size', 'XS', 'S', 'M', 'L', 'XL', 'XXL']
  }],
  images: [{
    type: String
  }],
  stock: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    userName: String,
    rating: Number,
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  isFeatured: {
    type: Boolean,
    default: false
  },
  isTrending: {
    type: Boolean,
    default: false
  },
  isNewArrival: {
    type: Boolean,
    default: false
  },
  isBestSeller: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', ProductSchema);
