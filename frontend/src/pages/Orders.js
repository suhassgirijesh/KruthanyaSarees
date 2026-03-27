import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { formatPrice } from '../utils/helpers';

const Orders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-luxury text-olive-dark mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Order ID: {order._id}</p>
                    <p className="text-sm text-gray-600">
                      Date: {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(order.orderStatus)}`}>
                    {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                  </span>
                </div>

                <div className="mb-4">
                  {order.items.map((item, idx) => (
                    <p key={idx} className="text-gray-700">
                      {item.name} x {item.quantity} - {formatPrice(item.price * item.quantity)}
                    </p>
                  ))}
                </div>

                <div className="flex justify-between items-center border-t pt-4">
                  <span className="font-bold text-lg text-olive-dark">
                    Total: {formatPrice(order.totalPrice)}
                  </span>
                  <button
                    onClick={() => setSelectedOrder(selectedOrder === order._id ? null : order._id)}
                    className="btn-outline text-sm"
                  >
                    {selectedOrder === order._id ? 'Hide Details' : 'View Details'}
                  </button>
                </div>

                {selectedOrder === order._id && (
                  <div className="mt-4 pt-4 border-t space-y-2 text-sm">
                    <h4 className="font-bold text-olive-dark">Shipping Address</h4>
                    <p>
                      {order.shippingAddress.street}<br />
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                    </p>
                    <h4 className="font-bold text-olive-dark mt-4">Payment Method</h4>
                    <p>{order.paymentMethod === 'razorpay' ? 'Credit/Debit Card' : 'Cash on Delivery'}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
