import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const OrderConfirmation = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="min-h-screen luxury-surface flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center glass-panel rounded-lg p-8">
        <div className="mb-6 flex justify-center">
          <FaCheckCircle className="text-6xl text-green-500" />
        </div>

        <h1 className="text-4xl font-luxury text-gold-soft mb-4">Order Confirmed!</h1>

        <p className="text-soft-white/70 mb-4">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        <div className="bg-black/30 rounded-lg p-6 mb-6 border border-gold/30">
          <p className="text-soft-white/60 text-sm mb-2">Order ID</p>
          <p className="text-xl font-bold text-gold-soft break-all">{orderId}</p>
        </div>

        <p className="text-soft-white/70 mb-8">
          You will receive a confirmation email shortly with order details and tracking information.
        </p>

        <div className="space-y-3">
          <Link to="/orders" className="block btn-primary">
            View My Orders
          </Link>
          <Link to="/" className="block btn-outline">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
