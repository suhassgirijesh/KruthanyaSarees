import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [authLoading, isAuthenticated, from, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/api/auth/login', formData);
      if (response.data.success) {
        login(response.data.user, response.data.token);
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen luxury-surface flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full glass-panel rounded-lg p-8">
        <h1 className="text-3xl font-luxury text-gold-soft text-center mb-2">
          {isAdminLogin ? 'Admin Login' : 'Welcome Back'}
        </h1>
        
        <div className="flex gap-2 mb-8 bg-black/30 rounded-lg p-1">
          <button
            onClick={() => setIsAdminLogin(false)}
            className={`flex-1 py-2 px-4 rounded transition ${!isAdminLogin ? 'bg-gold text-midnight font-semibold' : 'text-soft-white/60 hover:text-soft-white'}`}
          >
            User Login
          </button>
          <button
            onClick={() => setIsAdminLogin(true)}
            className={`flex-1 py-2 px-4 rounded transition ${isAdminLogin ? 'bg-gold text-midnight font-semibold' : 'text-soft-white/60 hover:text-soft-white'}`}
          >
            Admin Login
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gold/20 bg-black/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gold/20 bg-black/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          {isAdminLogin && (
            <div className="bg-amber-900/20 border border-amber-600/30 px-4 py-2 rounded text-sm text-amber-100">
              <p className="font-semibold">Admin credentials required</p>
              <p className="text-xs mt-1">Only administrators can access the admin dashboard.</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50"
          >
            {loading ? 'Logging in...' : isAdminLogin ? 'Admin Login' : 'Login'}
          </button>
        </form>

        {!isAdminLogin && (
          <div className="mt-6 text-center">
            <p className="text-soft-white/70">
              Don't have an account?{' '}
              <Link to="/signup" className="text-gold-soft font-bold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        )}

        {isAdminLogin && (
          <div className="mt-6 text-center">
            <p className="text-soft-white/70 text-sm">
              Not an admin?{' '}
              <button onClick={() => setIsAdminLogin(false)} className="text-gold-soft font-bold hover:underline">
                User Login
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
