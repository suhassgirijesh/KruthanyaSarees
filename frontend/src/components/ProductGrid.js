import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useCart } from '../context/CartContext';
import api from '../utils/api';

const ProductGrid = ({ title, endpoint }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get(endpoint);
        if (response.data.success) {
          setProducts(response.data.products || []);
        }
      } catch (error) {
        console.error(`Error fetching ${title}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [endpoint, title]);

  if (loading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title">{title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-80 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="section-title">{title}</h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
    </section>
  );
};

export default ProductGrid;
