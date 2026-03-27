const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    name: String,
    quantity: Number,
    price: Number,
    discount: Number
  }],
  totalPrice: {
    type: Number,
    required: true
  },
  shippingAddress: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  paymentMethod: {
    type: String,
    enum: ['razorpay', 'cod'],
    required: true
  },
  paymentId: String,
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  deliveryDate: Date,
  notes: String
});

module.exports = mongoose.model('Order', OrderSchema);
