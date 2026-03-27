# Quick Start Guide for KRUTHANYA

## Initial Setup (One-time)

### Windows Users
```bash
setup.bat
```

### Mac/Linux Users
```bash
chmod +x setup.sh
./setup.sh
```

## Manual Setup

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

**Backend will run on:** http://localhost:5000

### 2. Frontend Setup (in a new terminal)
```bash
cd frontend
npm install
npm start
```

**Frontend will run on:** http://localhost:3000

## Configuration

### Backend .env
```
MONGODB_URI=mongodb://localhost:27017/kruthanya
JWT_SECRET=your_secret_key_here
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_SECRET=your_secret
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Frontend .env
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
```

## Admin Access

1. Create a user account through signup
2. Update user role in MongoDB:
   ```javascript
   // In MongoDB
   db.users.updateOne(
     { email: "admin@example.com" },
     { $set: { role: "admin" } }
   )
   ```
3. Login and access admin panel at `/admin`

## Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running (mongod)
- Check MONGODB_URI in backend/.env

### Port Already in Use
- Change PORT in backend/.env
- Update REACT_APP_API_URL in frontend/.env

### Module Not Found Errors
- Delete node_modules and package-lock.json
- Run: npm install again

## Project Features Overview

✅ User Authentication (JWT)
✅ Product Catalog with Categories
✅ Shopping Cart & Cart Management
✅ Checkout Process
✅ Payment Gateway (Razorpay)
✅ Order Management
✅ Admin Dashboard
✅ Product Reviews & Ratings
✅ Wishlist
✅ Responsive Design
✅ Dark/Light Theme (Customizable)

## Default Users

No default users. Create your own accounts!

## Next Steps

1. ✅ Run setup
2. ✅ Start MongoDB
3. ✅ Start Backend Server
4. ✅ Start Frontend Server
5. ✅ Create your account
6. ✅ Add products (as admin)
7. ✅ Make purchases
8. ✅ Enjoy!

---

**Happy Selling! 🎉**
