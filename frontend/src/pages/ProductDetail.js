import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaTruck, FaUndo } from 'react-icons/fa';
import BackButton from '../components/BackButton';
import { useCart } from '../context/CartContext';
import api from '../utils/api';
import { formatPrice, calculateDiscount, normalizeImageEntries } from '../utils/helpers';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/products/${id}`);
        if (response.data.success) {
          setProduct(response.data.product);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!product) {
    return <div className="flex items-center justify-center min-h-screen">Product not found</div>;
  }

  const finalPrice = calculateDiscount(product.price, product.discount);
  const taxation = (finalPrice * 18) / 100;

  // Get image URL - use database URL directly or construct from backend
  const getImageUrl = (imageName) => {
    if (!imageName) return null;
    // If it's already a full URL, use it directly
    if (imageName.startsWith('http')) return imageName;
    // Otherwise, serve from backend static files
    return `${process.env.REACT_APP_API_URL?.replace('/api', '')}/images/${imageName}`;
  };

  // Get fallback image URL
  const getFallbackImage = () => {
    return `${process.env.REACT_APP_API_URL?.replace('/api', '')}/images/placeholder.svg`;
  };

  const handleAddToCart = async () => {
    await addToCart(product?._id, quantity);
    alert('Product added to cart!');
  };

  const handleBuyNow = async () => {
    await addToCart(product?._id, quantity);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen luxury-surface py-12">
      <div className="max-w-7xl mx-auto px-4">
        <BackButton label="Back to Products" />
        
        {/* Breadcrumb */}
        <div className="mb-8 text-sm">
          <span className="text-soft-white/60">Home / Products / </span>
          <span className="text-gold-soft font-bold">{product?.category || 'Category'}</span>
        </div>

        {/* Product */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Images */}
          <div>
            <div className="glass-panel rounded-lg overflow-hidden mb-4">
              <div className="h-96 flex items-center justify-center bg-black/30">
                <img
                  src={getImageUrl(normalizeImageEntries(product?.images)[selectedImage] || '')}
                  alt={product?.name || 'Product'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    if (e.target.src !== getFallbackImage()) {
                      e.target.src = getFallbackImage();
                    } else {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }
                  }}
                />
                <span className="text-8xl" style={{ display: 'none' }}>👗</span>
              </div>
            </div>
            {/* Thumbnail Gallery */}
            {product?.images && product.images.length > 1 && (
              <div className="flex gap-2">
                {normalizeImageEntries(product.images).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded border-2 ${
                      selectedImage === idx ? 'border-gold-soft' : 'border-gray-300'
                    }`}
                  >
                    <img src={getImageUrl(img)} alt="" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <h1 className="text-4xl font-luxury text-gold-soft mb-4">{product?.name || 'Unknown Product'}</h1>

            {/* Category & Rating */}
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-gold/20 text-gold-soft px-3 py-1 rounded-full text-sm">
                {product?.category || 'Category'}
              </span>
              {product?.rating > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {'⭐'.repeat(Math.floor(product.rating || 0))}
                  </div>
                  <span className="text-sm text-gray-600">({(product.rating || 0).toFixed(1)})</span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="glass-panel rounded-lg p-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl font-bold text-gold-soft">
                  {formatPrice(finalPrice)}
                </span>
                {product?.discount > 0 && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product?.price || 0)}
                    </span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded font-bold">
                      {product.discount}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-soft-white/60 text-sm">+ {formatPrice(taxation)} GST</p>
            </div>

            {/* Details */}
            <div className="glass-panel rounded-lg p-6 mb-6 space-y-4">
              <div>
                <h3 className="font-bold text-gold-soft mb-2">Fabric Type</h3>
                <p className="text-soft-white/70">{product?.fabricType || 'N/A'}</p>
              </div>
              <div>
                <h3 className="font-bold text-gold-soft mb-2">Color</h3>
                <p className="text-soft-white/70">{product?.color || 'N/A'}</p>
              </div>
              <div>
                <h3 className="font-bold text-gold-soft mb-2">Description</h3>
                <p className="text-soft-white/70">{product?.description || 'No description available'}</p>
              </div>
            </div>

            {/* Size Selection */}
            {product?.size && product.size.length > 0 && (
              <div className="glass-panel rounded-lg p-6 mb-6">
                <h3 className="font-bold text-gold-soft mb-4">Select Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.size.map((size) => (
                    <button
                      key={size}
                      className="px-4 py-2 border border-gold/30 rounded hover:border-gold transition"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Action Buttons */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-bold text-gold-soft">Quantity:</label>
                <div className="flex items-center gap-2 border border-gold/30 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gold/10"
                  >
                    −
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gold/10"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn-primary flex items-center justify-center gap-2 py-3"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
                <button className="flex-1 btn-outline flex items-center justify-center gap-2 py-3">
                  <FaHeart /> Wishlist
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full bg-soft-white text-midnight py-3 rounded-lg font-bold hover:bg-gold-soft transition"
              >
                Buy Now
              </button>
            </div>

            {/* Info */}
            <div className="mt-8 space-y-4 text-sm text-soft-white/70">
              <div className="flex items-center gap-3">
                <FaTruck /> Free delivery on orders above ₹500
              </div>
              <div className="flex items-center gap-3">
                <FaUndo /> 7 days easy return policy
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-12">
            <h2 className="section-title">Customer Reviews</h2>
            <div className="space-y-4">
              {product.reviews.map((review, idx) => (
                <div key={idx} className="glass-panel rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-olive-dark">{review.userName}</h4>
                    <div className="flex text-yellow-400">{'⭐'.repeat(review.rating)}</div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
