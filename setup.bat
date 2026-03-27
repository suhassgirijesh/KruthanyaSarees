@echo off
echo 🚀 KRUTHANYA - Premium Saree E-Commerce Platform
echo ===============================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ Node.js found: %NODE_VERSION%

REM Backend Setup
echo.
echo Setting up Backend...
cd backend

if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
) else (
    echo Backend dependencies already installed
)

if not exist ".env" (
    echo Creating .env file from .env.example...
    copy .env.example .env
    echo ⚠️  Please update backend\.env with your configuration
)

cd ..

REM Frontend Setup
echo.
echo Setting up Frontend...
cd frontend

if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo Frontend dependencies already installed
)

if not exist ".env" (
    echo Creating .env file...
    (
        echo REACT_APP_API_URL=http://localhost:5000/api
        echo REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
    ) > .env
    echo ⚠️  Please update frontend\.env with your Razorpay key
)

cd ..

echo.
echo ✓ Setup complete!
echo.
echo To start the application:
echo 1. In one terminal, run: cd backend ^&^& npm run dev
echo 2. In another terminal, run: cd frontend ^&^& npm start
echo.
echo Ensure MongoDB is running before starting the backend
echo.
pause
