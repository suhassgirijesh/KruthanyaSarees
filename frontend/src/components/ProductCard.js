import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { calculateDiscount, formatPrice } from '../utils/helpers';

const ProductCard = ({ product, onAddToCart }) => {
  const finalPrice = product.discount
    ? calculateDiscount(product.price, product.discount)
    : product.price;

  return (
    <div className="glass-panel rounded-lg overflow-hidden card-hover">
      <Link
        to={`/product/${product._id}`}
        className="relative overflow-hidden bg-black/30 h-64 flex items-center justify-center"
      >
        {product.images && product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-charcoal to-midnight flex items-center justify-center">
            <span className="text-gold-soft text-4xl font-luxury">KS</span>
          </div>
        )}

        {product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-gold text-midnight px-3 py-1 rounded-full text-sm font-bold">
            {product.discount}% OFF
          </div>
        )}

        {product.isBestSeller && (
          <div className="absolute top-2 left-2 bg-black/70 text-gold-soft px-3 py-1 rounded-full text-sm font-bold">
            Best Seller
          </div>
        )}
      </Link>

      <div className="p-4">
        <h3 className="font-luxury text-lg text-gold-soft mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs text-soft-white/50 mb-2">{product.category}</p>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-soft-white">
            {formatPrice(finalPrice)}
          </span>
          {product.discount > 0 && (
            <span className="text-sm text-soft-white/40 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {product.rating > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex text-gold-soft">
              {'*'.repeat(Math.floor(product.rating))}
            </div>
            <span className="text-xs text-soft-white/60">({product.rating.toFixed(1)})</span>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => onAddToCart(product._id)}
            className="flex-1 btn-primary flex items-center justify-center gap-2"
          >
            <FaShoppingCart /> Add
          </button>
          <button className="btn-outline flex items-center justify-center px-4">
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
