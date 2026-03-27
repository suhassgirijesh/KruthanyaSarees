# KRUTHANYA Deployment Guide

## Production Deployment

### Backend Deployment (Heroku / Railway / Render)

#### Option 1: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Create Procfile in backend/**
   ```
   web: node server.js
   ```

3. **Initialize Git and Deploy**
   ```bash
   cd backend
   git init
   heroku login
   heroku create kruthanya-backend
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_atlas_uri
   heroku config:set JWT_SECRET=your_secret
   heroku config:set RAZORPAY_KEY_ID=your_key
   heroku config:set RAZORPAY_SECRET=your_secret
   heroku config:set FRONTEND_URL=https://your-frontend-url.com
   ```

#### Option 2: Railway

1. **Deploy directly from Git**
   ```bash
   npm install -g @railway/cli
   railway login
   railway init
   railway up
   ```

2. **Configure environment variables in Railway dashboard**

#### Option 3: Render

1. **Connect GitHub repository**
2. **Create new Web Service**
3. **Set build command:** `npm install`
4. **Set start command:** `npm start`
5. **Add environment variables**

### Frontend Deployment (Vercel / Netlify)

#### Option 1: Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

3. **Configure Environment Variables in Vercel Dashboard**
   - REACT_APP_API_URL=https://kruthanya-backend.herokuapp.com/api
   - REACT_APP_RAZORPAY_KEY_ID=your_key_id

#### Option 2: Netlify

1. **Build the project**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect GitHub repository
   - Build command: `npm run build`
   - Publish directory: `build`

3. **Add environment variables in Netlify dashboard**

#### Option 3: GitHub Pages (If backend is on separate domain)

```bash
cd frontend
npm run build
# Upload build folder to GitHub Pages or use gh-pages package
```

## Database Setup

### MongoDB Atlas (Cloud)

1. **Create Account** at https://www.mongodb.com/cloud/atlas

2. **Create Cluster**
   - Choose free tier (M0)
   - Select region
   - Create user credentials

3. **Get Connection String**
   - Copy connection string from Atlas
   - Use in MONGODB_URI

4. **Enable Security**
   - IP Whitelist (add 0.0.0.0/0 for development)
   - Create database user

### Local MongoDB (Development Only)

```bash
# Install MongoDB Community Edition
# https://docs.mongodb.com/manual/installation/

# Start MongoDB
mongod

# Connect
mongo
```

## Domain & SSL

1. **Custom Domain**
   - Purchase domain from GoDaddy, Namecheap, etc.
   - Update DNS settings to point to your hosting

2. **SSL Certificate**
   - Most platforms (Vercel, Netlify, Heroku) provide free SSL
   - Configure auto-renewal

## Email Setup (Optional)

For order notifications, configure email service:

1. **Gmail**
   - Enable 2FA
   - Generate App Password
   - Use in EMAIL_PASSWORD

2. **SendGrid / Mailgun**
   - Create account
   - Get API credentials
   - Configure in backend

## Performance Optimization

### Frontend
```bash
# Install and configure responsive images
npm install react-lazy-load-image-component

# Optimize bundles
npm install --save-dev webpack-bundle-analyzer

# Enable gzip compression in build
```

### Backend
```bash
# Add compression middleware
npm install compression

# Add helmet for security
npm install helmet

# Connect redis for caching
npm install redis
```

## Monitoring & Analytics

1. **Backend Monitoring**
   - Use Sentry for error tracking
   - Use New Relic for performance
   - Add logging with Winston

2. **Frontend Analytics**
   - Google Analytics
   - Mixpanel
   - Custom event tracking

## Security Checklist

- [ ] Enable HTTPS/SSL
- [ ] Update JWT_SECRET to strong random string
- [ ] Set secure CORS origins
- [ ] Enable rate limiting
- [ ] Add input validation
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS in production
- [ ] Regular security audits
- [ ] Keep dependencies updated

## CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      
      - name: Deploy Backend
        run: |
          cd backend
          npm install
          git push heroku main
      
      - name: Deploy Frontend
        run: |
          cd frontend
          npm install
          vercel --prod
```

## Scaling Strategies

### Phase 1: Small Scale (0-10K users)
- Single backend instance (Heroku Dyno, Railway)
- Shared MongoDB (Atlas M0)
- Vercel frontend

### Phase 2: Medium Scale (10K-100K users)
- Multiple backend instances with load balancer
- MongoDB M2+ cluster
- CDN for static assets (CloudFlare)
- Redis caching layer

### Phase 3: Large Scale (100K+ users)
- Kubernetes cluster
- Database replication
- API gateway
- Microservices architecture
- Message queue (RabbitMQ, Kafka)

## Backup & Recovery

1. **Database Backups**
   ```bash
   # MongoDB backup
   mongodump --uri "mongodb+srv://user:password@cluster.mongodb.net/kruthanya"
   
   # Restore
   mongorestore --uri "mongodb+srv://..." ./dump
   ```

2. **Code Backups**
   - Use GitHub for version control
   - Regular commits

3. **Recovery Plan**
   - Document recovery procedures
   - Test restores regularly

## Troubleshooting Deployment Issues

### Common Issues & Solutions

1. **CORS Error in Production**
   - Update FRONTEND_URL in backend
   - Check CORS configuration

2. **Environment Variables Not Loading**
   - Verify all vars are set in platform
   - Restart application

3. **Database Connection Timeout**
   - Check IP whitelist
   - Verify connection string

4. **Payment Gateway Not Working**
   - Verify Razorpay keys
   - Check key format

5. **Images Not Loading**
   - Enable CORS for image CDN
   - Update image URLs

## Monitoring Commands

```bash
# Check logs (Heroku)
heroku logs --tail

# Monitor performance
heroku logs --dyno router

# Database stats
mongo stats

# API health check
curl https://api.kruthanya.com/api/health
```

## Cost Estimation (Monthly)

- **Backend Hosting**: $7 - $50 (Heroku free, Railway, Railway)
- **Database**: $0 - $50 (MongoDB Atlas free tier up to 512MB)
- **Frontend Hosting**: Free (Vercel/Netlify)
- **Domain**: $10 - 15
- **Email Service**: Free - $20
- **Total**: $17 - $135/month

## Support & Maintenance

1. **Regular Updates**
   - Update dependencies monthly
   - Security patches immediately

2. **Monitoring**
   - Set up alerts for errors
   - Monitor server health

3. **Backups**
   - Daily database backups
   - Code version control

4. **Documentation**
   - Keep deployment docs updated
   - Document custom changes

---

**Production Ready! 🚀**
