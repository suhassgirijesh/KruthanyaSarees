const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search, sort } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let products = Product.find(query);

    if (sort === 'price_asc') {
      products = products.sort({ price: 1 });
    } else if (sort === 'price_desc') {
      products = products.sort({ price: -1 });
    } else if (sort === 'newest') {
      products = products.sort({ createdAt: -1 });
    } else if (sort === 'rating') {
      products = products.sort({ rating: -1 });
    }

    const result = await products.exec();

    res.json({
      success: true,
      count: result.length,
      products: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews.userId', 'firstName lastName');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
};

const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true }).limit(8);

    res.json({
      success: true,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured products',
      error: error.message
    });
  }
};

const getTrendingProducts = async (req, res) => {
  try {
    const products = await Product.find({ isTrending: true }).limit(8);

    res.json({
      success: true,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching trending products',
      error: error.message
    });
  }
};

const getNewArrivals = async (req, res) => {
  try {
    const products = await Product.find({ isNewArrival: true }).sort({ createdAt: -1 }).limit(8);

    res.json({
      success: true,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching new arrivals',
      error: error.message
    });
  }
};

const getBestSellers = async (req, res) => {
  try {
    const products = await Product.find({ isBestSeller: true }).limit(8);

    res.json({
      success: true,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching best sellers',
      error: error.message
    });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category }).sort({ createdAt: -1 });

    res.json({
      success: true,
      category,
      count: products.length,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
};

const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.id;
    const userId = req.user.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const review = {
      userId,
      userName: `${req.user.firstName || 'User'} ${req.user.lastName || ''}`,
      rating,
      comment,
      createdAt: new Date()
    };

    product.reviews.push(review);

    // Calculate average rating
    const avgRating = product.reviews.reduce((acc, rev) => acc + rev.rating, 0) / product.reviews.length;
    product.rating = Math.round(avgRating * 2) / 2;

    await product.save();

    res.json({
      success: true,
      message: 'Review added successfully',
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding review',
      error: error.message
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getFeaturedProducts,
  getTrendingProducts,
  getNewArrivals,
  getBestSellers,
  getProductsByCategory,
  addReview
};
