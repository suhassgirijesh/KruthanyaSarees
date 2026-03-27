const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  getFeaturedProducts,
  getTrendingProducts,
  getNewArrivals,
  getBestSellers,
  getProductsByCategory,
  addReview
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');

router.get('/', getAllProducts);
router.get('/featured', getFeaturedProducts);
router.get('/trending', getTrendingProducts);
router.get('/new-arrivals', getNewArrivals);
router.get('/best-sellers', getBestSellers);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);
router.post('/:id/review', protect, addReview);

module.exports = router;
