const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({
      message: 'You are not logged in!',
    });
  }
  try {
    // 1) Verify token
    const decoded = jwt.verify(token, preprocessCSS.env.JWT_SECRETE);

    // 2) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        message: 'User no longer exists',
      });
    }

    //Grant access
    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }
};
