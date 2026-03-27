const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  try {

    let token;

    // Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "test_secret"
    );

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
      error: error.message
    });
  }
};

const admin = (req, res, next) => {

  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Admin access required'
    });
  }

  next();
};

module.exports = {
  protect,
  admin
};