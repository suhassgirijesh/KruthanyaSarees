const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getCart = async (req, res) => {
  try {

    let cart = await Cart.findOne({ userId: req.user.id })
      .populate("items.productId");

    if (!cart) {
      cart = new Cart({
        userId: req.user.id,
        items: [],
        totalPrice: 0
      });

      await cart.save();
    }

    res.json({
      success: true,
      cart
    });

  } catch (error) {

    console.error("GET CART ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error fetching cart",
      error: error.message
    });
  }
};


const addToCart = async (req, res) => {
  try {

    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const qty = Number(quantity) || 1;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID required"
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
        totalPrice: 0
      });
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId.toString()
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += qty;
    } else {
      cart.items.push({
        productId: product._id,
        quantity: qty,
        price: product.price,
        discount: product.discount
      });
    }

    // Calculate total price
    cart.totalPrice = cart.items.reduce((total, item) => {

      const itemPrice = item.price * item.quantity;
      const discountAmount = (itemPrice * item.discount) / 100;

      return total + (itemPrice - discountAmount);

    }, 0);

    await cart.save();

    res.json({
      success: true,
      message: "Product added to cart",
      cart
    });

  } catch (error) {

    console.error("ADD CART ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error adding to cart",
      error: error.message
    });
  }
};


const removeFromCart = async (req, res) => {
  try {

    const { productId } = req.params;
    const userId = req.user.id;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId.toString()
    );

    // Recalculate total
    cart.totalPrice = cart.items.reduce((total, item) => {

      const itemPrice = item.price * item.quantity;
      const discountAmount = (itemPrice * item.discount) / 100;

      return total + (itemPrice - discountAmount);

    }, 0);

    await cart.save();

    res.json({
      success: true,
      message: "Product removed from cart",
      cart
    });

  } catch (error) {

    console.error("REMOVE CART ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error removing from cart",
      error: error.message
    });
  }
};


const updateCartItem = async (req, res) => {
  try {

    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id;

    const qty = Number(quantity);

    if (qty < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1"
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId.toString()
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart"
      });
    }

    cart.items[itemIndex].quantity = qty;

    // Recalculate total
    cart.totalPrice = cart.items.reduce((total, item) => {

      const itemPrice = item.price * item.quantity;
      const discountAmount = (itemPrice * item.discount) / 100;

      return total + (itemPrice - discountAmount);

    }, 0);

    await cart.save();

    res.json({
      success: true,
      message: "Cart updated",
      cart
    });

  } catch (error) {

    console.error("UPDATE CART ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error updating cart",
      error: error.message
    });
  }
};


const clearCart = async (req, res) => {
  try {

    const userId = req.user.id;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();

    res.json({
      success: true,
      message: "Cart cleared",
      cart
    });

  } catch (error) {

    console.error("CLEAR CART ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error clearing cart",
      error: error.message
    });
  }
};


module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart
};