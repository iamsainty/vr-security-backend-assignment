const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY || "secretkey";

// Route to register users, all users can be registred from this same route, from the frontend role should be passed as a parameter
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await User.find({ email: email });

    if (user) {
      // if user already exists, return a message
      return res.json({ success: false, message: "Email already exists" });
    }

    // hashing the password for strengthening the security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // if user does not exist, create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // creating a token for the user for authentication
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, secretKey);
    res.json({
      success: true,
      message: "User created successfully",
      user: newUser,
      token: token,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// Route to login users, there will be an authtoken genrated which will contain the user role that will be used for allowing access to certain routes
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      //  if user does not exist, return a message
      return res.json({ success: false, message: "Email does not exist" });
    }

    // if user exists, check for valid password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.json({ success: false, message: "Invalid password" });
    }

    // if credentials are correct, create a token and send as response
    const token = jwt.sign({ id: user._id, role: user.role }, secretKey);

    res.json({
      success: true,
      message: "User logged in successfully",
      user: user,
      token: token,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

module.exports = router;
