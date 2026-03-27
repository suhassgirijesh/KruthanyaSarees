import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { formatPrice } from '../utils/helpers';

const Admin = () => {
  const { token, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Silk Sarees',
    price: '',
    discount: '0',
    fabricType: '',
    color: '',
    stock: ''
  });

  useEffect(() => {
    if (!isAdmin) {
      window.location.href = '/';
      return;
    }
    fetchDashboard();
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get('/admin/dashboard/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await api.get('/admin/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/admin/products', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        alert('Product added successfully');
        fetchProducts();
        setShowAddProduct(false);
        setFormData({
          name: '', description: '', category: 'Silk Sarees',
          price: '', discount: '0', fabricType: '', color: '', stock: ''
        });
      }
    } catch (error) {
      alert('Error adding product: ' + error.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const response = await api.delete(`/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        alert('Product deleted');
        fetchProducts();
      }
    } catch (error) {
      alert('Error deleting product');
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await api.put(
        `/admin/orders/${orderId}/status`,
        { orderStatus: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        alert('Order status updated');
        fetchOrders();
      }
    } catch (error) {
      alert('Error updating order');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-screen bg-olive-dark text-white shadow-lg">
        <div className="p-6 border-b border-olive">
          <h1 className="text-2xl font-luxury font-bold">KRUTHANYA Admin</h1>
        </div>
        <nav className="mt-8 space-y-4 px-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeTab === 'dashboard' ? 'bg-olive' : 'hover:bg-olive-dark'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeTab === 'products' ? 'bg-olive' : 'hover:bg-olive-dark'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeTab === 'orders' ? 'bg-olive' : 'hover:bg-olive-dark'
            }`}
          >
            Orders
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Dashboard */}
        {activeTab === 'dashboard' && stats && (
          <div>
            <h1 className="text-3xl font-bold text-olive-dark mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 shadow">
                <p className="text-gray-600 text-sm">Total Products</p>
                <p className="text-3xl font-bold text-olive-dark">{stats.totalProducts}</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow">
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-olive-dark">{stats.totalUsers}</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow">
                <p className="text-gray-600 text-sm">Total Orders</p>
                <p className="text-3xl font-bold text-olive-dark">{stats.totalOrders}</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow">
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-olive-dark">
                  {formatPrice(stats.totalRevenue)}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow">
              <h2 className="text-xl font-bold text-olive-dark mb-4">Recent Orders</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Order ID</th>
                      <th className="text-left p-2">Customer</th>
                      <th className="text-left p-2">Amount</th>
                      <th className="text-left p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentOrders?.map(order => (
                      <tr key={order._id} className="border-b">
                        <td className="p-2 text-sm">{order._id.slice(0, 8)}</td>
                        <td className="p-2 text-sm">{order.userId?.firstName} {order.userId?.lastName}</td>
                        <td className="p-2 text-sm">{formatPrice(order.totalPrice)}</td>
                        <td className="p-2 text-sm font-bold">{order.orderStatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-olive-dark">Products</h1>
              <button
                onClick={() => setShowAddProduct(!showAddProduct)}
                className="btn-primary"
              >
                {showAddProduct ? 'Cancel' : 'Add Product'}
              </button>
            </div>

            {showAddProduct && (
              <form onSubmit={handleAddProduct} className="bg-white rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold text-olive-dark mb-4">Add New Product</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="col-span-2 px-4 py-2 border rounded"
                  />
                  <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    className="col-span-2 px-4 py-2 border rounded"
                  />
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="px-4 py-2 border rounded"
                  >
                    <option>Silk Sarees</option>
                    <option>Cotton Sarees</option>
                    <option>Wedding Sarees</option>
                    <option>Designer Sarees</option>
                    <option>Party Wear Sarees</option>
                    <option>Traditional Sarees</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Price"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                    className="px-4 py-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Discount %"
                    value={formData.discount}
                    onChange={(e) => setFormData({...formData, discount: e.target.value})}
                    className="px-4 py-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Fabric Type"
                    value={formData.fabricType}
                    onChange={(e) => setFormData({...formData, fabricType: e.target.value})}
                    required
                    className="px-4 py-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Color"
                    value={formData.color}
                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                    required
                    className="px-4 py-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    required
                    className="px-4 py-2 border rounded"
                  />
                </div>
                <button type="submit" className="btn-primary mt-4">Add Product</button>
              </form>
            )}

            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="text-left p-4">Name</th>
                    <th className="text-left p-4">Category</th>
                    <th className="text-left p-4">Price</th>
                    <th className="text-left p-4">Stock</th>
                    <th className="text-left p-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id} className="border-b">
                      <td className="p-4">{product.name}</td>
                      <td className="p-4">{product.category}</td>
                      <td className="p-4">{formatPrice(product.price)}</td>
                      <td className="p-4">{product.stock}</td>
                      <td className="p-4">
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders */}
        {activeTab === 'orders' && (
          <div>
            <h1 className="text-3xl font-bold text-olive-dark mb-8">Orders</h1>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="text-left p-4">Order ID</th>
                    <th className="text-left p-4">Customer</th>
                    <th className="text-left p-4">Amount</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id} className="border-b">
                      <td className="p-4 text-sm">{order._id.slice(0, 8)}</td>
                      <td className="p-4">{order.userId?.firstName} {order.userId?.lastName}</td>
                      <td className="p-4">{formatPrice(order.totalPrice)}</td>
                      <td className="p-4">
                        <select
                          value={order.orderStatus}
                          onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                          className="px-3 py-1 border rounded text-sm"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
