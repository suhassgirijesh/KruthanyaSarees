# KRUTHANYA - Developer Notes & Best Practices

## Project Overview

KRUTHANYA is a premium saree e-commerce platform built with React (frontend), Node.js/Express (backend), and MongoDB (database). The project follows best practices for scalability, security, and maintainability.

## Architecture Overview

### Frontend Architecture
```
React App
├── Routing (React Router v6)
├── State Management (Context API)
├── HTTP Client (Axios)
└── Styling (Tailwind CSS)
```

### Backend Architecture
```
Express Server
├── Routes (6 route files)
├── Controllers (6 controller files)
├── Models (4 Mongoose schemas)
├── Middleware (Auth, Error handling)
└── Utilities (Helpers, Config)
```

## Development Workflow

### 1. Adding a New Feature

#### Step 1: Backend
- Create database model (if needed)
- Create controller with business logic
- Create/update route file
- Test API with Postman/Thunder Client
- Document endpoint

#### Step 2: Frontend
- Create component or page
- Create API service function
- Integrate with context/state
- Add error handling
- Test UI

### 2. Code Style Guidelines

**Backend (Node.js)**
```javascript
// Use arrow functions
const getUser = async (req, res) => {
  try {
    // Business logic
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

// Use descriptive names
const calculateOrderTotal = (items) => { ... };
```

**Frontend (React)**
```javascript
// Use functional components with hooks
const MyComponent = () => {
  const [state, setState] = useState(null);
  
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  return <div>JSX</div>;
};
```

## Common Development Tasks

### Adding a New Product Category

1. **Update backend validation**
   - Edit Product.js category enum

2. **Frontend Navbar**
   - Add to categories array in Navbar.js

3. **Create category page**
   - Already handled by Products.js with query params

### Adding Admin Feature

1. **Create controller function in adminController.js**
2. **Create route in admin.js**
3. **Add auth middleware (admin role)**
4. **Create UI in Admin.js page**
5. **Test with admin user**

### Database Query Optimization

```javascript
// Good: Use .select() to limit fields
const user = await User.findById(id).select('name email');

// Good: Use .populate() for references
const orders = await Order.find().populate('userId', 'name email');

// Avoid: Multiple queries
// Bad: N+1 query problem
```

## Error Handling

### Backend Error Handling
```javascript
// Validation errors
if (!email || !password) {
  return res.status(400).json({
    success: false,
    message: 'Email and password required'
  });
}

// Not found errors
if (!product) {
  return res.status(404).json({
    success: false,
    message: 'Product not found'
  });
}

// Server errors
try {
  // code
} catch (error) {
  res.status(500).json({
    success: false,
    message: 'Server error',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
}
```

### Frontend Error Handling
```javascript
try {
  const response = await api.get('/products');
  // Success
} catch (error) {
  const message = error.response?.data?.message || 'An error occurred';
  setError(message);
  // Show error to user
}
```

## Security Best Practices

### 1. Authentication
- ✅ JWT tokens stored in localStorage
- ✅ Token sent with every protected request
- ✅ Token expiration configured
- ⚠️ Consider: httpOnly cookies for better security

### 2. Password Security
- ✅ Using bcryptjs for hashing
- ✅ 10 salt rounds
- ✅ Passwords hashed before storage

### 3. Input Validation
- ✅ Server-side validation on all endpoints
- ⚠️ Add: Express-validator for advanced validation
- ⚠️ Add: Sanitization to prevent XSS

### 4. Environment Variables
- ✅ Sensitive data in .env
- ✅ .env in .gitignore
- ✅ Different values for dev/prod

## Performance Optimization

### Frontend
```javascript
// Code splitting
const admin = lazy(() => import('./pages/Admin'));

// Memoization for expensive components
const ProductCard = memo(({ product }) => {...});

// Efficient state updates
setItems(prev => [...prev.slice(0, -1)]);
```

### Backend
```javascript
// Database indexing
// Add to models:
// email: { type: String, index: true, unique: true }

// Pagination
const page = req.query.page || 1;
const limit = 10;
const products = await Product.find()
  .skip((page - 1) * limit)
  .limit(limit);

// Caching
const cachedProducts = await redis.get('featured');
```

## Testing

### Manual Testing Checklist
- [ ] User can register
- [ ] User can login
- [ ] Cart functionality works
- [ ] Checkout flow completes
- [ ] Payment processing
- [ ] Admin can add products
- [ ] Order management works
- [ ] Responsive on mobile
- [ ] All links work
- [ ] Forms validate

### Testing Tools
```bash
# Backend API Testing
# Use Postman, Thunder Client, or REST Client

# Frontend Testing
npm test  # Run Jest tests
npm run build  # Build production

# Check for errors
npm run lint  # If ESLint configured
```

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database backed up
- [ ] Images uploaded to CDN
- [ ] SSL certificate installed
- [ ] CORS configured correctly
- [ ] API rate limiting enabled
- [ ] Logging configured
- [ ] Error tracking setup
- [ ] Database indexed
- [ ] API documented
- [ ] README updated
- [ ] Load testing done

## Scaling Strategies

### Database Scaling
```javascript
// If database gets large
// 1. Add indexes: db.products.createIndex({ category: 1 })
// 2. Archive old orders
// 3. Enable database sharding
// 4. Use read replicas
```

### Application Scaling
```
Load Balancer
├── Backend Instance 1
├── Backend Instance 2
└── Backend Instance 3
    ↓
    MongoDB Replica Set
    ├── Primary
    ├── Secondary 1
    └── Secondary 2
```

## Debugging Tips

### Backend Debugging
```javascript
// Use console.log for quick debugging
console.log('User data:', data);

// Use try-catch blocks
// Use Postman to test endpoints
// Check MongoDB logs
// Enable debug mode: DEBUG=* npm start
```

### Frontend Debugging
```javascript
// React DevTools browser extension
// Console logs
console.log('State:', state);

// Network tab for API calls
// Performance tab for optimization
```

## Common Issues & Solutions

### Issue: CORS Error
**Solution**: Check FRONTEND_URL in .env

### Issue: 404 API Error
**Solution**: Verify route path and method (GET/POST/PUT)

### Issue: Cart not persisting
**Solution**: Check localStorage and API response

### Issue: Images not loading
**Solution**: Verify image URLs and CORS

### Issue: Payment fails
**Solution**: Check Razorpay credentials

## File Size Guidelines

- Component: ~300 lines max
- Page: ~500 lines max
- Controller: ~400 lines max
- Utility: ~200 lines max

## Naming Conventions

### Files
```
components/Navbar.js (PascalCase)
pages/Home.js (PascalCase)
utils/helpers.js (camelCase)
context/AuthContext.js (PascalCase)
```

### Variables
```javascript
// Component state
const [isLoading, setIsLoading] = useState(false);

// Prefixes
is* for booleans
*Count for numbers
handle* for functions
on* for event handlers
```

## Comments & Documentation

### Good Comments
```javascript
// Calculate tax on order total
const tax = total * 0.18;

// User authentication middleware
const protect = (req, res, next) => { ... };
```

### Avoid
```javascript
// ❌ Obvious comments
const i = 0; // Initialize i to 0

// ❌ Outdated comments
// This function calculates price (does something else now)
```

## Git Workflow

```bash
# Feature branch
git checkout -b feature/add-wishlist

# Commit messages
git commit -m "feat: add wishlist functionality"
git commit -m "fix: cart calculation bug"
git commit -m "docs: update README"

# Push and create PR
git push origin feature/add-wishlist
```

## Environment Variables Reference

**Frontend (.env)**
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_RAZORPAY_KEY_ID=<your_key>
```

**Backend (.env)**
```
MONGODB_URI=
JWT_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_SECRET=
PORT=5000
FRONTEND_URL=
```

## Resources & References

### Documentation
- [React Docs](https://react.dev)
- [Express Docs](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Razorpay API](https://razorpay.com/docs)

### Tools
- [Postman](https://postman.com) - API Testing
- [MongoDB Compass](https://www.mongodb.com/products/compass) - Database GUI
- [VS Code](https://code.visualstudio.com/) - Editor
- [Git](https://git-scm.com/) - Version Control

## Support & Contact

For questions about the codebase:
- Check existing comments in code
- Refer to this document
- Check API documentation
- Review similar implementations

## Version History

- **v1.0.0** (Current) - Initial release with all core features

## Future Improvements

1. Add TypeScript for type safety
2. Add unit/integration tests
3. Implement advanced caching
4. Add GraphQL API
5. Implement real-time notifications
6. Add machine learning recommendations

---

**Happy Coding! 🚀**

Remember: Write code for humans first, computers second.
