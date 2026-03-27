import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import api from '../utils/api';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    search: searchParams.get('search') || '',
    sort: ''
  });
  const { addToCart } = useCart();

  const categories = [
    'Silk Sarees',
    'Cotton Sarees',
    'Wedding Sarees',
    'Designer Sarees',
    'Party Wear Sarees',
    'Traditional Sarees'
  ];

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.search) params.append('search', filters.search);
      if (filters.sort) params.append('sort', filters.sort);

      const response = await api.get(`/products?${params}`);
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-luxury text-olive-dark mb-8">
          {filters.search ? `Search Results for "${filters.search}"` : 'All Sarees'}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="bg-white rounded-lg p-6 h-fit">
            <h2 className="text-lg font-bold text-olive-dark mb-6">Filter</h2>

            {/* Category */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-700 mb-3">Category</h3>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-700 mb-3">Price Range</h3>
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>

            {/* Sort */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-700 mb-3">Sort By</h3>
              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Default</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <button
              onClick={() => setFilters({
                category: '', minPrice: '', maxPrice: '', search: '', sort: ''
              })}
              className="btn-outline w-full text-center"
            >
              Clear Filters
            </button>
          </div>

          {/* Products */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-200 h-80 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onAddToCart={() => {
                      addToCart(product._id, 1);
                      alert('Added to cart!');
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
