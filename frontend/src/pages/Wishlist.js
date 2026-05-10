import React from 'react';
import BackButton from '../components/BackButton';

const Wishlist = () => {
  return (
    <div className="min-h-screen luxury-surface py-12">
      <div className="max-w-7xl mx-auto px-4">
        <BackButton label="Back to Products" />
        
        <div className="text-center mt-8">
          <div className="text-8xl mb-4">❤️</div>
          <h1 className="text-3xl font-luxury text-gold-soft mb-4">My Wishlist</h1>
          <p className="text-soft-white/70 mb-8">Your wishlist is empty. Start adding your favorite sarees!</p>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
