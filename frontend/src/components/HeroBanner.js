import React from 'react';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <div className="relative h-96 md:h-screen bg-gradient-to-r from-olive-dark to-olive overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-pattern"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-between max-w-7xl mx-auto px-4">
        <div className="flex-1">
          <h1 className="text-white font-luxury text-5xl md:text-7xl font-bold mb-4">
            Timeless <br /> Elegance
          </h1>
          <p className="text-white text-lg md:text-2xl mb-8 opacity-90">
            Experience the grace and charm of premium sarees
          </p>
          <div className="flex gap-4">
            <Link to="/products" className="btn-secondary">
              Shop Now
            </Link>
            <Link to="/about" className="btn-outline text-white border-white hover:bg-white">
              Learn More
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="hidden lg:flex flex-1 justify-center items-center">
          <div className="relative">
            <div className="w-80 h-96 bg-gradient-to-br from-beige to-cream rounded-lg shadow-2xl flex items-center justify-center">
              <span className="text-9xl">👗</span>
            </div>
            <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-beige opacity-20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
    </div>
  );
};

export default HeroBanner;
