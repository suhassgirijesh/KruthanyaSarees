import React, { createContext, useCallback, useContext, useState, useEffect } from 'react';
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

  const getProductId = (itemOrProductId) => {
    if (typeof itemOrProductId === 'string') return itemOrProductId;
    return itemOrProductId?._id || itemOrProductId?.productId?._id || itemOrProductId?.productId;
  };

  // Fetch cart from server
  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setCartItems(response.data.cart.items || []);
        setCartTotal(response.data.cart.totalPrice || 0);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartItems([]);
      setCartTotal(0);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchCart();
    }
  }, [fetchCart, isAuthenticated, token]);

  const addToCart = async (productId, quantity = 1) => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }

    try {
      const response = await api.post(
        '/api/cart/add',
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
      const id = getProductId(productId);
      const response = await api.delete(`/api/cart/remove/${id}`, {
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
      const id = getProductId(productId);
      const response = await api.put(
        `/api/cart/update/${id}`,
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
      const response = await api.delete('/api/cart/clear', {
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

  const cartCount = cartItems.reduce((count, item) => count + Number(item.quantity || 0), 0);

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
