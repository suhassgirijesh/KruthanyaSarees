import React from 'react';
import HeroBanner from '../components/HeroBanner';
import ProductGrid from '../components/ProductGrid';
import Features from '../components/Features';

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <Features />
      <ProductGrid title="Featured Collection" endpoint="/products/featured" />
      <ProductGrid title="Trending Sarees" endpoint="/products/trending" />
      <ProductGrid title="New Arrivals" endpoint="/products/new-arrivals" />
      <ProductGrid title="Best Sellers" endpoint="/products/best-sellers" />
    </div>
  );
};

export default Home;
