import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { formatPrice } from '../utils/helpers';

const Checkout = () => {

  const navigate = useNavigate();

  const {
    cartItems,
    cartTotal,
    clearCart,
    loading: cartLoading
  } = useCart();

  const {
    user,
    token,
    isAuthenticated
  } = useAuth();

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

    if (!cartLoading && cartItems.length === 0) {
      navigate('/cart');
    }

  }, [cartItems.length, cartLoading, isAuthenticated, navigate]);


  const loadRazorpay = () => {

    return new Promise((resolve) => {

      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');

      script.src = 'https://checkout.razorpay.com/v1/checkout.js';

      script.onload = () => resolve(true);

      script.onerror = () => resolve(false);

      document.body.appendChild(script);

    });

  };


  const taxAmount = (cartTotal * 18) / 100;

  const finalTotal = cartTotal + taxAmount;


  const handleAddressChange = (e) => {

    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value
    }));

  };


  const handleCheckout = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const orderResponse = await api.post(
        '/orders',
        {
          shippingAddress: { ...user, ...address },
          paymentMethod,
          notes: ''
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (orderResponse.data.success) {

        const orderId = orderResponse.data.orderId;

        if (paymentMethod === 'razorpay') {

          const scriptLoaded = await loadRazorpay();

          if (!scriptLoaded) {
            throw new Error('Razorpay SDK failed to load');
          }

          const paymentResponse = await api.post(
            '/payment/create-order',
            {
              amount: orderResponse.data.order.totalPrice,
              orderId
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

          if (!paymentResponse.data.success) {
            throw new Error('Unable to create Razorpay order');
          }

          const options = {

            key: "rzp_test_SmusDkRMM1b5Mp",

            amount: paymentResponse.data.order.amount,

            currency: "INR",

            name: "KRUTHANYA SAREES",

            description: "Saree Purchase",

            order_id: paymentResponse.data.order.id,

            prefill: {
              name: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
              email: user?.email,
              contact: user?.phone
            },

            theme: {
              color: "#014421"
            },

            handler: async function (response) {

              try {

                await api.post(
                  '/payment/verify',
                  {
                    orderId,
                    razorpayOrderId: response.razorpay_order_id,
                    paymentId: response.razorpay_payment_id,
                    signature: response.razorpay_signature
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  }
                );

                alert("Payment Successful ✅");

                await clearCart();

                navigate('/order-confirmation', {
                  state: { orderId }
                });

              } catch (error) {

                console.log(error);

                alert("Payment verification failed");

              }
            }
          };

          const razorpay = new window.Razorpay(options);

          razorpay.on('payment.failed', function (response) {

            alert(
              response.error?.description ||
              'Payment failed. Please try again.'
            );

          });

          razorpay.open();

        } else {

          await clearCart();

          navigate('/order-confirmation', {
            state: { orderId }
          });

        }
      }

    } catch (error) {

      console.log(error);

      alert(
        'Error processing order: ' +
        (error.response?.data?.message || error.message)
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="min-h-screen luxury-surface py-12">

      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-3xl font-luxury text-gold-soft mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* FORM */}
          <div className="lg:col-span-2">

            <form
              onSubmit={handleCheckout}
              className="space-y-6"
            >

              {/* SHIPPING */}
              <div className="glass-panel rounded-lg p-6">

                <h2 className="text-xl font-bold text-gold-soft mb-4">
                  Shipping Address
                </h2>

                <div className="space-y-4">

                  <div className="grid grid-cols-2 gap-4">

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        First Name
                      </label>

                      <input
                        type="text"
                        value={user?.firstName || ''}
                        disabled
                        className="w-full px-4 py-2 border border-gold/20 rounded-lg bg-black/30 text-soft-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Last Name
                      </label>

                      <input
                        type="text"
                        value={user?.lastName || ''}
                        disabled
                        className="w-full px-4 py-2 border border-gold/20 rounded-lg bg-black/30 text-soft-white"
                      />
                    </div>

                  </div>

                  <div>

                    <label className="block text-sm font-semibold mb-2">
                      Street Address
                    </label>

                    <input
                      type="text"
                      name="street"
                      value={address.street}
                      onChange={handleAddressChange}
                      required
                      className="w-full px-4 py-2 border border-gold/20 rounded-lg bg-black/30 text-soft-white"
                    />

                  </div>

                  <div className="grid grid-cols-2 gap-4">

                    <div>

                      <label className="block text-sm font-semibold mb-2">
                        City
                      </label>

                      <input
                        type="text"
                        name="city"
                        value={address.city}
                        onChange={handleAddressChange}
                        required
                        className="w-full px-4 py-2 border border-gold/20 rounded-lg bg-black/30 text-soft-white"
                      />

                    </div>

                    <div>

                      <label className="block text-sm font-semibold mb-2">
                        State
                      </label>

                      <input
                        type="text"
                        name="state"
                        value={address.state}
                        onChange={handleAddressChange}
                        required
                        className="w-full px-4 py-2 border border-gold/20 rounded-lg bg-black/30 text-soft-white"
                      />

                    </div>

                  </div>

                  <div>

                    <label className="block text-sm font-semibold mb-2">
                      Zip Code
                    </label>

                    <input
                      type="text"
                      name="zipCode"
                      value={address.zipCode}
                      onChange={handleAddressChange}
                      required
                      className="w-full px-4 py-2 border border-gold/20 rounded-lg bg-black/30 text-soft-white"
                    />

                  </div>

                </div>

              </div>


              {/* PAYMENT */}
              <div className="glass-panel rounded-lg p-6">

                <h2 className="text-xl font-bold text-gold-soft mb-4">
                  Payment Method
                </h2>

                <div className="space-y-4">

                  <label className="flex items-center cursor-pointer">

                    <input
                      type="radio"
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


          {/* ORDER SUMMARY */}
          <div className="lg:col-span-1">

            <div className="glass-panel rounded-lg p-6 sticky top-24">

              <h2 className="text-xl font-bold text-gold-soft mb-6">
                Order Summary
              </h2>

              {cartItems.map((item) => (

                <div
                  key={item.productId?._id || item.productId}
                  className="flex justify-between text-sm mb-4 pb-4 border-b border-gold/20"
                >

                  <span>
                    {item.productId?.name || 'Product'} x {item.quantity}
                  </span>

                  <span>
                    {formatPrice(item.price * item.quantity)}
                  </span>

                </div>

              ))}

              <div className="space-y-4 mb-6">

                <div className="flex justify-between">

                  <span>Subtotal</span>

                  <span>{formatPrice(cartTotal)}</span>

                </div>

                <div className="flex justify-between">

                  <span>GST (18%)</span>

                  <span>{formatPrice(taxAmount)}</span>

                </div>

                <div className="flex justify-between">

                  <span>Shipping</span>

                  <span className="text-gold-soft">FREE</span>

                </div>

              </div>

              <div className="pt-6 border-t border-gold/30 flex justify-between text-lg font-bold text-gold-soft">

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