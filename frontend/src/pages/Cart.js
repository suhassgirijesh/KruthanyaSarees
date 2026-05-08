import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';

const Cart = () => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const taxAmount = (cartTotal * 18) / 100;
  const finalTotal = cartTotal + taxAmount;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen luxury-surface py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="glass-panel rounded-lg p-10">
            <h1 className="text-3xl font-luxury text-gold-soft mb-4">Your Cart is Empty</h1>
            <p className="text-soft-white/70 mb-8">Add a saree you love and your checkout will appear here.</p>
            <Link to="/products" className="btn-primary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen luxury-surface py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-luxury text-gold-soft mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const product = item.productId;
              const productId = product?._id || product;

              return (
                <div key={productId} className="glass-panel rounded-lg p-4 md:p-6 flex gap-4 md:gap-6">
                  <div className="w-24 h-24 bg-black/30 rounded flex-shrink-0 overflow-hidden">
                    {product?.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gold-soft font-luxury">KS</div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gold-soft mb-1">{product?.name || 'Product'}</h3>
                    <p className="text-soft-white/50 text-sm mb-4">{product?.category || 'Saree'}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold">{formatPrice(item.price)}</span>
                      {item.discount > 0 && <span className="text-gold-soft font-bold">{item.discount}% off</span>}
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => removeFromCart(productId)} className="text-red-300 hover:text-red-200" aria-label="Remove">
                      <FaTrash />
                    </button>
                    <div className="flex items-center border border-gold/30 rounded">
                      <button
                        onClick={() => updateQuantity(productId, Math.max(1, item.quantity - 1))}
                        className="w-9 h-9 flex items-center justify-center hover:bg-gold/10"
                        aria-label="Decrease quantity"
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="w-10 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(productId, item.quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-gold/10"
                        aria-label="Increase quantity"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <div className="glass-panel rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-luxury text-gold-soft mb-6">Order Summary</h2>
              <div className="space-y-4 border-b border-gold/20 pb-6 mb-6">
                <div className="flex justify-between text-soft-white/70">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-soft-white/70">
                  <span>GST (18%)</span>
                  <span>{formatPrice(taxAmount)}</span>
                </div>
                <div className="flex justify-between text-soft-white/70">
                  <span>Shipping</span>
                  <span className="text-gold-soft">FREE</span>
                </div>
              </div>
              <div className="flex justify-between text-xl font-bold text-gold-soft mb-6">
                <span>Total</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
              <button onClick={() => navigate('/checkout')} className="w-full btn-primary mb-3">
                Proceed to Checkout
              </button>
              <Link to="/products" className="block text-center btn-outline">
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
