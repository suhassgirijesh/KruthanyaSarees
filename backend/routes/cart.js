const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart
} = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getCart);
router.post('/add', protect, addToCart);
router.delete('/remove/:productId', protect, removeFromCart);
router.put('/update/:productId', protect, updateCartItem);
router.delete('/clear', protect, clearCart);

module.exports = router;
