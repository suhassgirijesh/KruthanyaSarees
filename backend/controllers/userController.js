const User = require('../models/User');

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile',
      error: error.message
    });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone, address } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        firstName,
        lastName,
        phone,
        address
      },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { wishlist: productId } },
      { new: true }
    ).populate('wishlist');

    res.json({
      success: true,
      message: 'Product added to wishlist',
      wishlist: user.wishlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding to wishlist',
      error: error.message
    });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { wishlist: productId } },
      { new: true }
    ).populate('wishlist');

    res.json({
      success: true,
      message: 'Product removed from wishlist',
      wishlist: user.wishlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing from wishlist',
      error: error.message
    });
  }
};

const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('wishlist');

    res.json({
      success: true,
      wishlist: user.wishlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching wishlist',
      error: error.message
    });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  addToWishlist,
  removeFromWishlist,
  getWishlist
};
