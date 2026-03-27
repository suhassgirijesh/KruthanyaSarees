const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Razorpay = require('razorpay');

let razorpay = null;

// Initialize Razorpay only if keys exist
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
  });
}

const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod, notes } = req.body;
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    const order = new Order({
      userId,
      items: cart.items.map(item => ({
        productId: item.productId._id,
        name: item.productId.name,
        quantity: item.quantity,
        price: item.price,
        discount: item.discount
      })),
      totalPrice: cart.totalPrice,
      shippingAddress,
      paymentMethod,
      notes,
      paymentStatus: 'pending'
    });

    await order.save();

    res.json({
      success: true,
      message: 'Order created successfully',
      orderId: order._id,
      order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message
    });
  }
};

const createPaymentOrder = async (req, res) => {
  try {

    if (!razorpay) {
      return res.status(400).json({
        success: false,
        message: "Razorpay not configured"
      });
    }

    const { amount, orderId } = req.body;

    const options = {
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: `order_${orderId}`,
      payment_capture: 1
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating payment order',
      error: error.message
    });
  }
};

const verifyPayment = async (req, res) => {
  try {

    const { orderId, paymentId, signature } = req.body;

    const body = orderId + "|" + paymentId;

    const expectedSignature = require("crypto")
      .createHmac("sha256", process.env.RAZORPAY_SECRET || "test")
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed"
      });
    }

    const order = await Order.findById(orderId);

    if (order) {
      order.paymentStatus = "completed";
      order.paymentId = paymentId;
      order.orderStatus = "confirmed";
      await order.save();

      await Cart.findOneAndUpdate(
        { userId: req.user.id },
        { items: [], totalPrice: 0 }
      );
    }

    res.json({
      success: true,
      message: "Payment verified successfully",
      order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error verifying payment",
      error: error.message
    });
  }
};

const getOrders = async (req, res) => {
  try {

    const userId = req.user.id;

    const orders = await Order.find({ userId })
      .populate("items.productId")
      .sort({ orderDate: -1 });

    res.json({
      success: true,
      orders
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message
    });
  }
};

const getOrderById = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id)
      .populate("items.productId");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    if (order.userId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    res.json({
      success: true,
      order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching order",
      error: error.message
    });
  }
};

const cancelOrder = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    if (order.userId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    if (["shipped", "delivered"].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel this order"
      });
    }

    order.orderStatus = "cancelled";
    await order.save();

    res.json({
      success: true,
      message: "Order cancelled",
      order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error cancelling order",
      error: error.message
    });
  }
};

module.exports = {
  createOrder,
  createPaymentOrder,
  verifyPayment,
  getOrders,
  getOrderById,
  cancelOrder
};