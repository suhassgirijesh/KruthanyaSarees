const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true   // ensures one cart per user
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },

      quantity: {
        type: Number,
        required: true,
        default: 1
      },

      price: {
        type: Number,
        required: true
      },

      discount: {
        type: Number,
        default: 0
      }
    }
  ],

  totalPrice: {
    type: Number,
    default: 0
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp automatically
CartSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Cart", CartSchema);