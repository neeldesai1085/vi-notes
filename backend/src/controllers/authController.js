const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// Register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      authProvider: "local",
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        authProvider: user.authProvider,
      },
    });
  } catch (error) {
    console.error("Register error:", error.message);
    return res.status(500).json({
      message: "Server error during registration",
    });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    if (!user.password) {
      return res.status(400).json({
        message: "This account was created using Google login",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        authProvider: user.authProvider,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({
      message: "Server error during login",
    });
  }
};

// Get current logged in user
const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      authProvider: req.user.authProvider,
      createdAt: req.user.createdAt,
      updatedAt: req.user.updatedAt,
    });
  } catch (error) {
    console.error("GetMe error:", error.message);
    return res.status(500).json({
      message: "Server error while fetching user",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
