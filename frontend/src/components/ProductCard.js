import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { formatPrice, calculateDiscount } from '../utils/helpers';

const ProductCard = ({ product, onAddToCart }) => {
  const finalPrice = product.discount
    ? calculateDiscount(product.price, product.discount)
    : product.price;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md card-hover">
      {/* Image */}
      <Link to={`/product/${product._id}`} className="relative overflow-hidden bg-gray-100 h-64 flex items-center justify-center">
        {product.images && product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-110 transition"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-olive-dark to-olive flex items-center justify-center">
            <span className="text-white text-4xl">👗</span>
          </div>
        )}
        {product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            {product.discount}% OFF
          </div>
        )}
        {product.isBestSeller && (
          <div className="absolute top-2 left-2 bg-olive-dark text-white px-3 py-1 rounded-full text-sm font-bold">
            Best Seller
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-luxury text-lg text-olive-dark mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Category */}
        <p className="text-xs text-gray-500 mb-2">{product.category}</p>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-olive-dark">
            {formatPrice(finalPrice)}
          </span>
          {product.discount > 0 && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Rating */}
        {product.rating > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex text-yellow-400">
              {'⭐'.repeat(Math.floor(product.rating))}
            </div>
            <span className="text-xs text-gray-600">({product.rating.toFixed(1)})</span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onAddToCart(product._id)}
            className="flex-1 btn-primary flex items-center justify-center gap-2"
          >
            <FaShoppingCart /> Add
          </button>
          <button className="flex-1 btn-outline flex items-center justify-center">
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
