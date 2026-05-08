const express = require('express');
const router = express.Router();
const {
  createOrder,
  createPaymentOrder,
  verifyPayment,
  getOrders,
  getOrderById,
  cancelOrder
} = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createOrder);
router.post('/create', protect, createOrder);
router.post('/payment-order', protect, createPaymentOrder);
router.post('/create-order', protect, createPaymentOrder);
router.post('/verify', protect, verifyPayment);
router.get('/', protect, getOrders);
router.get('/my', protect, getOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/cancel', protect, cancelOrder);

module.exports = router;
