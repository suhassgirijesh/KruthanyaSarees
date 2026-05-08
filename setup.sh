#!/bin/bash

echo "🚀 KRUTHANYA - Premium Saree E-Commerce Platform"
echo "==============================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js found: $(node -v)${NC}"

# Backend Setup
echo -e "\n${YELLOW}Setting up Backend...${NC}"
cd backend

if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
else
    echo "Backend dependencies already installed"
fi

if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please update backend/.env with your configuration${NC}"
fi

cd ..

# Frontend Setup
echo -e "\n${YELLOW}Setting up Frontend...${NC}"
cd frontend

if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
else
    echo "Frontend dependencies already installed"
fi

if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cat > .env << EOF
REACT_APP_API_URL=http://${process.env.react_app_api_url}\/api
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
EOF
    echo -e "${YELLOW}⚠️  Please update frontend/.env with your Razorpay key${NC}"
fi

cd ..

echo -e "\n${GREEN}✓ Setup complete!${NC}"
echo ""
echo -e "${YELLOW}To start the application:${NC}"
echo "1. In one terminal, run: cd backend && npm run dev"
echo "2. In another terminal, run: cd frontend && npm start"
echo ""
echo -e "${YELLOW}Ensure MongoDB is running before starting the backend${NC}"
echo ""
