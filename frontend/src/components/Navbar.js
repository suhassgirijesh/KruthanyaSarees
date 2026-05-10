import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaSearch, FaShoppingCart, FaTimes, FaUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const categories = [
    'kanchipuram Silk Sarees',
    'Cotton Sarees',
    'Satin silk Sarees',
    'Georgette Sarees',
    'Semi Crape Sarees',
    'Traditional Sarees'
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-midnight/95 backdrop-blur border-b border-gold/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold text-midnight rounded-full flex items-center justify-center font-luxury font-bold">
              K
            </div>
            <span className="text-xl md:text-2xl font-luxury font-bold text-gold-soft">
              KRUTHANYA SAREES
            </span>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-8 max-w-xl">
            <input
              type="text"
              placeholder="Search silk, wedding, cotton..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gold/20 bg-black/40 text-soft-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-gold text-midnight rounded-r-lg hover:bg-gold-soft transition"
              aria-label="Search"
            >
              <FaSearch />
            </button>
          </form>

          <div className="flex items-center gap-5">
            <Link to="/cart" className="relative text-gold-soft text-xl hover:text-gold transition" aria-label="Cart">
              <FaShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-soft-white text-midnight text-xs rounded-full min-w-5 h-5 px-1 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="text-gold-soft text-xl hover:text-gold transition" aria-label="Account">
                  <FaUser />
                </button>
                <div className="absolute right-0 mt-0 w-52 glass-panel rounded-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 delay-100 group-hover:delay-0 overflow-hidden z-40">
                  <div className="px-4 py-3 border-b border-gold/20 text-sm text-soft-white/70">
                    {user?.firstName || 'Account'}
                  </div>
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gold/10 transition">Profile</Link>
                  <Link to="/orders" className="block px-4 py-2 hover:bg-gold/10 transition">My Orders</Link>
                  {isAdmin && <Link to="/admin" className="block px-4 py-2 hover:bg-gold/10 transition">Admin Dashboard</Link>}
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gold/10 transition">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden sm:flex gap-3 text-sm">
                <Link to="/login" className="text-soft-white/80 hover:text-gold-soft">Login</Link>
                <Link to="/signup" className="text-gold-soft hover:text-gold">Sign Up</Link>
              </div>
            )}

            <button
              className="md:hidden text-gold-soft text-xl"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <div className="hidden md:flex border-t border-gold/10 h-12 items-center gap-7 overflow-x-auto">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/category/${encodeURIComponent(cat)}`}
              className="text-sm text-soft-white/70 hover:text-gold-soft transition whitespace-nowrap"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-charcoal border-t border-gold/20 px-4 pb-4">
          <form onSubmit={handleSearch} className="py-4 flex">
            <input
              type="text"
              placeholder="Search sarees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gold/20 bg-black/40 rounded-l-lg"
            />
            <button className="px-4 py-2 bg-gold text-midnight rounded-r-lg" aria-label="Search">
              <FaSearch />
            </button>
          </form>
          <div className="space-y-1">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/category/${encodeURIComponent(cat)}`}
                className="block text-soft-white/80 hover:text-gold-soft py-2"
                onClick={() => setIsOpen(false)}
              >
                {cat}
              </Link>
            ))}
            {!isAuthenticated && (
              <>
                <Link to="/login" className="block py-2 text-soft-white" onClick={() => setIsOpen(false)}>Login</Link>
                <Link to="/signup" className="block py-2 text-gold-soft" onClick={() => setIsOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
