import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../utils/api';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { token, isAuthenticated } = useAuth();

  // Fetch cart from server
  useEffect(() => {
    if (isAuthenticated && token) {
      fetchCart();
    }
  }, [isAuthenticated, token]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await api.get('/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setCartItems(response.data.cart.items || []);
        setCartTotal(response.data.cart.totalPrice || 0);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }

    try {
      const response = await api.post(
        '/cart/add',
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setCartItems(response.data.cart.items);
        setCartTotal(response.data.cart.totalPrice);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await api.delete(`/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setCartItems(response.data.cart.items);
        setCartTotal(response.data.cart.totalPrice);
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await api.put(
        `/cart/update/${productId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setCartItems(response.data.cart.items);
        setCartTotal(response.data.cart.totalPrice);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      const response = await api.delete('/cart/clear', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setCartItems([]);
        setCartTotal(0);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const cartCount = cartItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        cartCount,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
