const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  addToWishlist,
  removeFromWishlist,
  getWishlist
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.post('/wishlist', protect, addToWishlist);
router.delete('/wishlist/:productId', protect, removeFromWishlist);
router.get('/wishlist', protect, getWishlist);

module.exports = router;
