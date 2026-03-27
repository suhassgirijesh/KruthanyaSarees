import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes, FaHeart } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const categories = [
    'Silk Sarees',
    'Cotton Sarees',
    'Wedding Sarees',
    'Designer Sarees',
    'Party Wear Sarees',
    'Traditional Sarees'
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`);
      setSearchTerm('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top Bar */}
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-olive-dark rounded-full flex items-center justify-center">
                <span className="text-white font-bold">K</span>
              </div>
              <span className="text-2xl font-luxury font-bold text-olive-dark hidden sm:inline">
                KRUTHANYA
              </span>
            </Link>

            {/* Search Bar - Hidden on mobile */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-8">
              <input
                type="text"
                placeholder="Search sarees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-olive-dark"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-olive-dark text-white rounded-r-lg hover:bg-olive transition"
              >
                <FaSearch />
              </button>
            </form>

            {/* Right Icons */}
            <div className="flex items-center gap-6">
              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="text-olive-dark text-xl hover:text-olive transition hidden sm:inline"
              >
                <FaHeart />
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative text-olive-dark text-xl hover:text-olive transition">
                <FaShoppingCart />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="text-olive-dark text-xl hover:text-olive transition">
                    <FaUser />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-olive-dark hover:bg-beige"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-olive-dark hover:bg-beige"
                    >
                      Orders
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-olive-dark hover:bg-beige"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-olive-dark hover:bg-beige"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link to="/login" className="text-olive-dark hover:text-olive text-sm">
                    Login
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link to="/signup" className="text-olive-dark hover:text-olive text-sm">
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-olive-dark text-xl"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>

          {/* Categories Bar */}
          <div className="hidden md:flex border-t border-gray-200 h-12 items-center gap-8">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/category/${cat}`}
                className="text-sm text-gray-700 hover:text-olive-dark transition whitespace-nowrap"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-cream border-t">
            <form onSubmit={handleSearch} className="p-4">
              <input
                type="text"
                placeholder="Search sarees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </form>
            <div className="px-4 py-2 space-y-2">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  to={`/category/${cat}`}
                  className="block text-olive-dark hover:text-olive py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
