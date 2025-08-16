const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

//Signup
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = await User.create({ username, email, password });
    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: { user: newUser },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

//Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  //1) Check if email & password exist
  if (!email || !password) {
    return res.status(400).json({
      message: 'Provide email and password',
    });
  }

  //2) Check if user exists & password is correct
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status.json({
      message: 'Incorrect email or password',
    });
  }

  //3) Send token
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
};
