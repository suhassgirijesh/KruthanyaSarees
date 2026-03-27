import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaTruck, FaUndo } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import api from '../utils/api';
import { formatPrice, calculateDiscount } from '../utils/helpers';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/products/${id}`);
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

  const handleAddToCart = () => {
    addToCart(product._id, quantity);
    alert('Product added to cart!');
  };

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm">
          <span className="text-gray-600">Home / Products / </span>
          <span className="text-olive-dark font-bold">{product.category}</span>
        </div>

        {/* Product */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Images */}
          <div>
            <div className="bg-white rounded-lg overflow-hidden mb-4">
              <div className="h-96 flex items-center justify-center bg-gray-100">
                {product.images && product.images[selectedImage] ? (
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-8xl">👗</span>
                )}
              </div>
            </div>
            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded border-2 ${
                      selectedImage === idx ? 'border-olive-dark' : 'border-gray-300'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <h1 className="text-4xl font-luxury text-olive-dark mb-4">{product.name}</h1>

            {/* Category & Rating */}
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-beige text-olive-dark px-3 py-1 rounded-full text-sm">
                {product.category}
              </span>
              {product.rating > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {'⭐'.repeat(Math.floor(product.rating))}
                  </div>
                  <span className="text-sm text-gray-600">({product.rating.toFixed(1)})</span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl font-bold text-olive-dark">
                  {formatPrice(finalPrice)}
                </span>
                {product.discount > 0 && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded font-bold">
                      {product.discount}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-gray-600 text-sm">+ {formatPrice(taxation)} GST</p>
            </div>

            {/* Details */}
            <div className="bg-white rounded-lg p-6 mb-6 space-y-4">
              <div>
                <h3 className="font-bold text-olive-dark mb-2">Fabric Type</h3>
                <p className="text-gray-600">{product.fabricType}</p>
              </div>
              <div>
                <h3 className="font-bold text-olive-dark mb-2">Color</h3>
                <p className="text-gray-600">{product.color}</p>
              </div>
              <div>
                <h3 className="font-bold text-olive-dark mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            </div>

            {/* Size Selection */}
            {product.size && product.size.length > 0 && (
              <div className="bg-white rounded-lg p-6 mb-6">
                <h3 className="font-bold text-olive-dark mb-4">Select Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.size.map((size) => (
                    <button
                      key={size}
                      className="px-4 py-2 border-2 border-gray-300 rounded hover:border-olive-dark transition"
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
                <label className="font-bold text-olive-dark">Quantity:</label>
                <div className="flex items-center gap-2 border border-gray-300 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100"
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
                onClick={() => navigate('/checkout')}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition"
              >
                Buy Now
              </button>
            </div>

            {/* Info */}
            <div className="mt-8 space-y-4 text-sm text-gray-600">
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
                <div key={idx} className="bg-white rounded-lg p-6 border border-gray-200">
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
