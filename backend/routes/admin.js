const express = require('express');
const router = express.Router();
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  updateOrderStatus,
  getAllUsers,
  getDashboardStats
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

// Protect all admin routes
router.use(protect, admin);

// Product routes
router.post('/products', addProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Order routes
router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);

// User routes
router.get('/users', getAllUsers);

// Dashboard
router.get('/dashboard/stats', getDashboardStats);

module.exports = router;
