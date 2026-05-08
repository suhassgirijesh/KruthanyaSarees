import React, { useCallback, useEffect, useState } from 'react';
import { FaEdit, FaPlus, FaSave, FaTimes, FaTrash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { formatPrice } from '../utils/helpers';

const emptyProduct = {
  name: '',
  description: '',
  category: 'Silk Sarees',
  price: '',
  discount: '0',
  fabricType: '',
  color: '',
  images: '',
  stock: '',
  size: 'Free Size'
};

const Admin = () => {
  const { token, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyProduct);

  const fetchDashboard = useCallback(async () => {
    try {
      const response = await api.get('/admin/dashboard/stats', { headers: { Authorization: `Bearer ${token}` } });
      if (response.data.success) setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    }
  }, [token]);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await api.get('/products');
      if (response.data.success) setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await api.get('/admin/orders', { headers: { Authorization: `Bearer ${token}` } });
      if (response.data.success) setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }, [token]);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await api.get('/admin/users', { headers: { Authorization: `Bearer ${token}` } });
      if (response.data.success) setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, [token]);

  useEffect(() => {
    if (!isAdmin) return;
    fetchDashboard();
    fetchProducts();
    fetchOrders();
    fetchUsers();
  }, [fetchDashboard, fetchOrders, fetchProducts, fetchUsers, isAdmin]);

  const handleInput = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const buildPayload = () => ({
    ...formData,
    price: Number(formData.price),
    discount: Number(formData.discount || 0),
    stock: Number(formData.stock || 0),
    images: formData.images
      ? formData.images.split(',').map(image => image.trim()).filter(Boolean)
      : [],
    size: formData.size
      ? formData.size.split(',').map(size => size.trim()).filter(Boolean)
      : ['Free Size']
  });

  const resetForm = () => {
    setFormData(emptyProduct);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = buildPayload();
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = editingId
        ? await api.put(`/admin/products/${editingId}`, payload, config)
        : await api.post('/admin/products', payload, config);

      if (response.data.success) {
        resetForm();
        fetchProducts();
        fetchDashboard();
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Unable to save product');
    }
  };

  const startEdit = (product) => {
    setEditingId(product._id);
    setShowForm(true);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      category: product.category || 'Silk Sarees',
      price: product.price || '',
      discount: product.discount || '0',
      fabricType: product.fabricType || '',
      color: product.color || '',
      images: product.images?.join(', ') || '',
      stock: product.stock || '',
      size: product.size?.join(', ') || 'Free Size'
    });
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      const response = await api.delete(`/admin/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      if (response.data.success) {
        fetchProducts();
        fetchDashboard();
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Unable to delete product');
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await api.put(`/admin/orders/${orderId}/status`, { orderStatus: newStatus }, { headers: { Authorization: `Bearer ${token}` } });
      if (response.data.success) {
        fetchOrders();
        fetchDashboard();
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Unable to update order');
    }
  };

  const categories = ['Silk Sarees', 'Cotton Sarees', 'Wedding Sarees', 'Designer Sarees', 'Party Wear Sarees', 'Traditional Sarees'];
  const tabs = ['dashboard', 'products', 'orders', 'users'];

  return (
    <div className="min-h-screen luxury-surface">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <p className="text-gold-soft text-sm uppercase">Seller Console</p>
            <h1 className="text-3xl font-luxury text-soft-white">KRUTHANYA Admin</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded capitalize ${activeTab === tab ? 'bg-gold text-midnight' : 'border border-gold/30 text-gold-soft'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {[
                ['Products', stats?.totalProducts || 0],
                ['Users', stats?.totalUsers || 0],
                ['Orders', stats?.totalOrders || 0],
                ['Revenue', formatPrice(stats?.totalRevenue || 0)]
              ].map(([label, value]) => (
                <div key={label} className="glass-panel rounded-lg p-6">
                  <p className="text-soft-white/60 text-sm">{label}</p>
                  <p className="text-3xl font-bold text-gold-soft mt-2">{value}</p>
                </div>
              ))}
            </div>

            <div className="glass-panel rounded-lg p-6 overflow-x-auto">
              <h2 className="text-xl font-bold text-gold-soft mb-4">Recent Orders</h2>
              <table className="w-full min-w-[680px]">
                <thead className="text-soft-white/60">
                  <tr className="border-b border-gold/20">
                    <th className="text-left p-3">Order</th>
                    <th className="text-left p-3">Customer</th>
                    <th className="text-left p-3">Amount</th>
                    <th className="text-left p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.recentOrders?.map(order => (
                    <tr key={order._id} className="border-b border-gold/10">
                      <td className="p-3 text-sm">{order._id.slice(0, 8)}</td>
                      <td className="p-3">{order.userId?.firstName} {order.userId?.lastName}</td>
                      <td className="p-3">{formatPrice(order.totalPrice)}</td>
                      <td className="p-3 text-gold-soft capitalize">{order.orderStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-luxury text-gold-soft">Products</h2>
              <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2">
                <FaPlus /> Add Product
              </button>
            </div>

            {showForm && (
              <form onSubmit={handleSubmitProduct} className="glass-panel rounded-lg p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gold-soft">{editingId ? 'Edit Product' : 'Add Product'}</h3>
                  <button type="button" onClick={resetForm} className="text-soft-white/70"><FaTimes /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required placeholder="Name" value={formData.name} onChange={(e) => handleInput('name', e.target.value)} className="md:col-span-2 px-4 py-2 rounded bg-black/30 border border-gold/20" />
                  <textarea required placeholder="Description" value={formData.description} onChange={(e) => handleInput('description', e.target.value)} className="md:col-span-2 px-4 py-2 rounded bg-black/30 border border-gold/20 min-h-24" />
                  <select value={formData.category} onChange={(e) => handleInput('category', e.target.value)} className="px-4 py-2 rounded bg-black/30 border border-gold/20">
                    {categories.map(category => <option key={category}>{category}</option>)}
                  </select>
                  <input required type="number" placeholder="Price" value={formData.price} onChange={(e) => handleInput('price', e.target.value)} className="px-4 py-2 rounded bg-black/30 border border-gold/20" />
                  <input type="number" placeholder="Discount %" value={formData.discount} onChange={(e) => handleInput('discount', e.target.value)} className="px-4 py-2 rounded bg-black/30 border border-gold/20" />
                  <input required placeholder="Fabric Type" value={formData.fabricType} onChange={(e) => handleInput('fabricType', e.target.value)} className="px-4 py-2 rounded bg-black/30 border border-gold/20" />
                  <input required placeholder="Color" value={formData.color} onChange={(e) => handleInput('color', e.target.value)} className="px-4 py-2 rounded bg-black/30 border border-gold/20" />
                  <input required type="number" placeholder="Stock" value={formData.stock} onChange={(e) => handleInput('stock', e.target.value)} className="px-4 py-2 rounded bg-black/30 border border-gold/20" />
                  <input placeholder="Image URLs, comma separated" value={formData.images} onChange={(e) => handleInput('images', e.target.value)} className="md:col-span-2 px-4 py-2 rounded bg-black/30 border border-gold/20" />
                  <input placeholder="Sizes, comma separated" value={formData.size} onChange={(e) => handleInput('size', e.target.value)} className="md:col-span-2 px-4 py-2 rounded bg-black/30 border border-gold/20" />
                </div>
                <button type="submit" className="btn-primary mt-4 flex items-center gap-2">
                  <FaSave /> {editingId ? 'Save Product' : 'Add Product'}
                </button>
              </form>
            )}

            <div className="glass-panel rounded-lg overflow-x-auto">
              <table className="w-full min-w-[760px]">
                <thead className="text-soft-white/60">
                  <tr className="border-b border-gold/20">
                    <th className="text-left p-4">Product</th>
                    <th className="text-left p-4">Category</th>
                    <th className="text-left p-4">Price</th>
                    <th className="text-left p-4">Stock</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id} className="border-b border-gold/10">
                      <td className="p-4">{product.name}</td>
                      <td className="p-4">{product.category}</td>
                      <td className="p-4">{formatPrice(product.price)}</td>
                      <td className="p-4">{product.stock}</td>
                      <td className="p-4 flex gap-3">
                        <button onClick={() => startEdit(product)} className="text-gold-soft" aria-label="Edit"><FaEdit /></button>
                        <button onClick={() => handleDeleteProduct(product._id)} className="text-red-300" aria-label="Delete"><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="glass-panel rounded-lg overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead className="text-soft-white/60">
                <tr className="border-b border-gold/20">
                  <th className="text-left p-4">Order</th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Payment</th>
                  <th className="text-left p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id} className="border-b border-gold/10">
                    <td className="p-4 text-sm">{order._id.slice(0, 8)}</td>
                    <td className="p-4">{order.userId?.firstName} {order.userId?.lastName}</td>
                    <td className="p-4">{formatPrice(order.totalPrice)}</td>
                    <td className="p-4 capitalize">{order.paymentStatus}</td>
                    <td className="p-4">
                      <select value={order.orderStatus} onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)} className="px-3 py-2 bg-black/30 border border-gold/20 rounded">
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
        )}

        {activeTab === 'users' && (
          <div className="glass-panel rounded-lg overflow-x-auto">
            <table className="w-full min-w-[680px]">
              <thead className="text-soft-white/60">
                <tr className="border-b border-gold/20">
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Email</th>
                  <th className="text-left p-4">Phone</th>
                  <th className="text-left p-4">Role</th>
                  <th className="text-left p-4">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id} className="border-b border-gold/10">
                    <td className="p-4">{user.firstName} {user.lastName}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">{user.phone}</td>
                    <td className="p-4 capitalize text-gold-soft">{user.role}</td>
                    <td className="p-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
