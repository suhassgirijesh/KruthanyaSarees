const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      discount,
      fabricType,
      color,
      size,
      images,
      stock,
      isFeatured,
      isTrending,
      isNewArrival,
      isBestSeller
    } = req.body;

    const product = new Product({
      name,
      description,
      category,
      price,
      discount,
      fabricType,
      color,
      size: Array.isArray(size) ? size : [size],
      images: Array.isArray(images) ? images : [images],
      stock,
      isFeatured: isFeatured || false,
      isTrending: isTrending || false,
      isNewArrival: isNewArrival || false,
      isBestSeller: isBestSeller || false
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding product',
      error: error.message
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Ensure arrays are properly handled
    if (updateData.size && !Array.isArray(updateData.size)) {
      updateData.size = [updateData.size];
    }
    if (updateData.images && !Array.isArray(updateData.images)) {
      updateData.images = [updateData.images];
    }

    updateData.updatedAt = new Date();

    const product = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const { status, sortBy } = req.query;
    let query = {};

    if (status) {
      query.orderStatus = status;
    }

    let orders = Order.find(query).populate('userId', 'firstName lastName email').sort({ orderDate: -1 });

    if (sortBy === 'total_asc') {
      orders = orders.sort({ totalPrice: 1 });
    } else if (sortBy === 'total_desc') {
      orders = orders.sort({ totalPrice: -1 });
    }

    const result = await orders.exec();

    res.json({
      success: true,
      count: result.length,
      orders: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order status'
      });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus, deliveryDate: orderStatus === 'delivered' ? new Date() : null },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order status updated',
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating order',
      error: error.message
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });

    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const completedOrders = await Order.countDocuments({ orderStatus: 'delivered' });
    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    const recentOrders = await Order.find().sort({ orderDate: -1 }).limit(5).populate('userId', 'firstName lastName email');

    res.json({
      success: true,
      stats: {
        totalProducts,
        totalUsers,
        totalOrders,
        completedOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        recentOrders
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard stats',
      error: error.message
    });
  }
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  updateOrderStatus,
  getAllUsers,
  getDashboardStats
};
