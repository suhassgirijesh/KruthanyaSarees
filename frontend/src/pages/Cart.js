import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';

const Cart = () => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const taxAmount = (cartTotal * 18) / 100;
  const finalTotal = cartTotal + taxAmount;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-cream py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-8xl mb-4">🛒</div>
          <h1 className="text-3xl font-luxury text-olive-dark mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some beautiful sarees to your cart!</p>
          <Link to="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-luxury text-olive-dark mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.productId} className="bg-white rounded-lg p-6 flex gap-6">
                {/* Product Image */}
                <div className="w-24 h-24 bg-gray-100 rounded flex-shrink-0">
                  {item.productId?.images?.[0] ? (
                    <img
                      src={item.productId.images[0]}
                      alt={item.productId.name}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">👗</div>
                  )}
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-olive-dark mb-2">
                    {item.productId?.name || 'Product'}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {item.productId?.category || 'Category'}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-bold text-olive-dark">
                      {formatPrice(item.price)}
                    </span>
                    {item.discount > 0 && (
                      <span className="text-red-600 font-bold">{item.discount}% off</span>
                    )}
                  </div>
                </div>

                {/* Quantity & Remove */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <FaTrash />
                  </button>
                  <div className="flex items-center gap-2 border border-gray-300 rounded">
                    <button
                      onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                      className="px-2 py-1 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="px-4 py-1">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="px-2 py-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-luxury text-olive-dark mb-6">Order Summary</h2>

              <div className="space-y-4 border-b border-gray-200 pb-6 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (18%)</span>
                  <span>{formatPrice(taxAmount)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold text-olive-dark mb-6">
                <span>Total</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full btn-primary mb-3"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/products"
                className="block text-center btn-outline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
