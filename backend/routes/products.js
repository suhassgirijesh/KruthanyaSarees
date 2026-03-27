const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/test', (req, res) => {
  console.log('Route hit: /api/products/test');
  return res.status(200).json({
    success: true,
    message: 'Products route is working'
  });
});

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching products'
    });
  }
});

console.log('Loaded /api/products router');

module.exports = router;
