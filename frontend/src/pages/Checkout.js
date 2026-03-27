import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { formatPrice } from '../utils/helpers';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, token, isAuthenticated } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, []);

  const taxAmount = (cartTotal * 18) / 100;
  const finalTotal = cartTotal + taxAmount;

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create order
      const orderResponse = await api.post(
        '/orders/create',
        {
          shippingAddress: { ...user, ...address },
          paymentMethod,
          notes: ''
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (orderResponse.data.success) {
        const orderId = orderResponse.data.orderId;

        if (paymentMethod === 'razorpay') {
          // Initialize Razorpay payment
          const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: Math.round(finalTotal * 100),
            currency: 'INR',
            name: 'KRUTHANYA',
            description: 'Saree Purchase',
            order_id: orderId,
            handler: async (response) => {
              // Verify payment
              await api.post(
                '/orders/verify',
                {
                  orderId,
                  paymentId: response.razorpay_payment_id,
                  signature: response.razorpay_signature
                },
                { headers: { Authorization: `Bearer ${token}` } }
              );
              await clearCart();
              navigate('/order-confirmation', { state: { orderId } });
            }
          };

          const razorpay = new window.Razorpay(options);
          razorpay.open();
        } else {
          // COD - Direct confirmation
          await clearCart();
          navigate('/order-confirmation', { state: { orderId } });
        }
      }
    } catch (error) {
      alert('Error processing order: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-luxury text-olive-dark mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleCheckout} className="space-y-6">
              {/* Shipping Address */}
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-bold text-olive-dark mb-4">Shipping Address</h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">First Name</label>
                      <input
                        type="text"
                        value={user?.firstName || ''}
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Last Name</label>
                      <input
                        type="text"
                        value={user?.lastName || ''}
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Street Address</label>
                    <input
                      type="text"
                      name="street"
                      value={address.street}
                      onChange={handleAddressChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-dark"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={address.city}
                        onChange={handleAddressChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-dark"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={address.state}
                        onChange={handleAddressChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-dark"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Zip Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={address.zipCode}
                      onChange={handleAddressChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-dark"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-bold text-olive-dark mb-4">Payment Method</h2>

                <div className="space-y-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="razorpay"
                      checked={paymentMethod === 'razorpay'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span>Credit/Debit Card (Razorpay)</span>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span>Cash on Delivery</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-olive-dark mb-6">Order Summary</h2>

              {cartItems.map((item) => (
                <div key={item.productId} className="flex justify-between text-sm mb-4 pb-4 border-b">
                  <span>{item.productId?.name} x {item.quantity}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}

              <div className="space-y-4 mb-6">
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

              <div className="pt-6 border-t-2 flex justify-between text-lg font-bold text-olive-dark">
                <span>Total</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
