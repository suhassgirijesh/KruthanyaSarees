const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    category: {
      type: String
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
      type: String
    },

    color: {
      type: String
    },

    size: [
      {
        type: String
      }
    ],

    images: [
      {
        type: String
      }
    ],

    stock: {
      type: Number,
      default: 0
    },

    rating: {
      type: Number,
      default: 0
    },

    reviews: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        userName: String,
        rating: {
          type: Number,
          min: 1,
          max: 5
        },
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],

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
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema);
