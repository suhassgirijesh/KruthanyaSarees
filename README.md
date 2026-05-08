# KRUTHANYA - Premium Saree E-Commerce Platform

A full-stack responsive e-commerce application for selling premium sarees online. Built with React, Node.js, Express, MongoDB, and integrated with Razorpay for payments.

## 🎨 Design Features

- **Elegant Color Scheme**: Olive Green (#3b5d3b) and Beige (#e8d8c3) for premium luxury feel
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Professional transitions and interactions
- **Luxury Typography**: Playfair Display for headings, Lato for body

## 🚀 Tech Stack

### Frontend
- **React.js** (v18+)
- **Tailwind CSS** - Utility-first styling
- **React Router v6** - Navigation
- **Axios** - HTTP client
- **React Icons** - Icon library
- **Context API** - State management

### Backend
- **Node.js & Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Razorpay** - Payment gateway
- **Bcryptjs** - Password hashing

## 📋 Features

### User Features
1. **Authentication**
   - User registration and login
   - JWT-based authentication
   - Profile management

2. **Shopping**
   - Browse sarees by category
   - Product search and filters
   - Add to cart and wishlist
   - Product ratings and reviews

3. **Checkout**
   - Address management
   - Multiple payment options (Card & COD)
   - Order confirmation
   - Order tracking

4. **User Dashboard**
   - Profile management
   - Order history
   - Wishlist management

### Admin Features
1. **Product Management**
   - Add, edit, delete products
   - Manage categories
   - Set pricing and discounts

2. **Order Management**
   - View all orders
   - Update order status
   - Track shipments

3. **Dashboard Analytics**
   - Sales statistics
   - User metrics
   - Revenue tracking
   - Recent orders

## 📁 Project Structure

```
KRUTHANYA/
├── backend/
│   ├── config/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── userController.js
│   │   └── adminController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── cart.js
│   │   ├── orders.js
│   │   ├── users.js
│   │   └── admin.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   ├── ProductCard.js
│   │   │   ├── ProductGrid.js
│   │   │   ├── HeroBanner.js
│   │   │   └── Features.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Products.js
│   │   │   ├── ProductDetail.js
│   │   │   ├── Cart.js
│   │   │   ├── Checkout.js
│   │   │   ├── OrderConfirmation.js
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── Profile.js
│   │   │   ├── Orders.js
│   │   │   ├── Wishlist.js
│   │   │   └── Admin.js
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── CartContext.js
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   └── helpers.js
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   ```
   MONGODB_URI=mongodb://localhost:27017/kruthanya
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   
   # Razorpay (Get from https://dashboard.razorpay.com)
   RAZORPAY_KEY_ID=your_key_id
   RAZORPAY_SECRET=your_secret_key
   
   # Email (Optional, for notifications)
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

5. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

6. **Run backend server**
   ```bash
   npm run dev
   ```
   Server will run on `http://${process.env.react_app_api_url}\`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   echo "REACT_APP_API_URL=http://${process.env.react_app_api_url}\/api
   REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id" > .env
   ```

4. **Start development server**
   ```bash
   npm start
   ```
   App will open at `http://localhost:3000`

## 🔐 Authentication

### User Registration
- POST `/api/auth/register`
- Required fields: firstName, lastName, email, password, phone

### User Login
- POST `/api/auth/login`
- Required fields: email, password
- Returns JWT token

### Protected Routes
- All routes requiring authentication use JWT token in Authorization header
- Format: `Authorization: Bearer <token>`

## 🛍️ API Endpoints

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/trending` - Get trending products
- `GET /api/products/new-arrivals` - Get new arrivals
- `GET /api/products/best-sellers` - Get best sellers
- `GET /api/products/:id` - Get product details
- `GET /api/products/category/:category` - Get products by category

### Cart (Protected)
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:productId` - Update item quantity
- `DELETE /api/cart/remove/:productId` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart

### Orders (Protected)
- `POST /api/orders/create` - Create new order
- `POST /api/orders/payment-order` - Create Razorpay order
- `POST /api/orders/verify` - Verify payment
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/cancel` - Cancel order

### Admin (Protected - Admin only)
- `POST /api/admin/products` - Add product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id/status` - Update order status
- `GET /api/admin/users` - Get all users
- `GET /api/admin/dashboard/stats` - Get dashboard statistics

## 💳 Payment Integration

### Razorpay Setup
1. Create account at [Razorpay](https://razorpay.com)
2. Get API keys from dashboard
3. Add keys to backend .env file
4. Frontend automatically loads Razorpay script

### Payment Flow
1. User adds items to cart
2. Proceeds to checkout
3. Selects payment method (Card or COD)
4. For card: Redirected to Razorpay payment gateway
5. Payment verification on backend
6. Order confirmation email sent

## 📦 Database Schema

### User Model
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: String (user/admin),
  address: {
    street, city, state, zipCode, country
  },
  wishlist: [Product references],
  createdAt: Date
}
```

### Product Model
```javascript
{
  name: String,
  description: String,
  category: String,
  price: Number,
  discount: Number,
  fabricType: String,
  color: String,
  size: [String],
  images: [String],
  stock: Number,
  rating: Number,
  reviews: [{...}],
  isFeatured: Boolean,
  isTrending: Boolean,
  isNewArrival: Boolean,
  isBestSeller: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model
```javascript
{
  userId: User reference,
  items: [{productId, quantity, price, discount}],
  totalPrice: Number,
  shippingAddress: {...},
  paymentMethod: String (razorpay/cod),
  paymentId: String,
  paymentStatus: String,
  orderStatus: String,
  orderDate: Date,
  deliveryDate: Date
}
```

## 🎨 Customization

### Colors
Edit in `frontend/tailwind.config.js`:
```javascript
colors: {
  'olive-dark': '#3b5d3b',
  'beige': '#e8d8c3',
  // ...
}
```

### Fonts
Configured in `frontend/src/styles/index.css`:
- Headings: Playfair Display
- Body: Lato

## 🚀 Deployment

### Backend Deployment (Heroku)
```bash
git push heroku main
```

### Frontend Deployment (Vercel)
```bash
vercel
```

## 📝 Sample Products

Add sample products using admin panel or directly in MongoDB:

```javascript
{
  name: "Silk Saree Red",
  description: "Beautiful red silk saree",
  category: "Silk Sarees",
  price: 5999,
  discount: 15,
  fabricType: "Mulberry Silk",
  color: "Red",
  size: ["One Size"],
  stock: 50,
  isFeatured: true,
  images: ["url1", "url2"]
}
```

## 🔒 Security Features

- JWT authentication
- Password hashing with bcryptjs
- CORS protection
- Input validation
- Admin role-based access control
- Secure payment integration

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in .env
- Verify MongoDB credentials

### CORS Issues
- Check FRONTEND_URL in backend .env
- Ensure frontend URL matches CORS configuration

### Razorpay Payment Fails
- Verify API keys are correct
- Check Razorpay keys in .env
- Ensure payment amount is in INR

## 📞 Support

For issues and suggestions, please contact: info@kruthanya.com

## 📄 License

This project is private and proprietary.

## 🎉 Ready to Launch!

Your KRUTHANYA e-commerce platform is ready to serve premium sarees to customers worldwide. Customize colors, add your products, and start selling!

---

**Made with ❤️ for saree lovers**
