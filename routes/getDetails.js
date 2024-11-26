const express = require("express");
const router = express.Router();
const validateUser = require("../Middleware/validateUser");
const User = require("../models/userModel");

// Routes to get user details, token should be sent int the header from the client side, i have a middleware which will return role (admin, moderator, user) from the token, if the roe is correct response will contain the user data

// route for getting admin details
router.get("/admin-details", validateUser, async (req, res) => {
  try {
    // get the role from middleware
    const role = req.user.role;

    // handle the case if role doesn't matches with the expected role
    if (role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "You are not an admin" });
    }

    //  get the user details from the database
    const user = await User.findOne({ _id: req.user._id }).select("-password");

    // check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // if everything is correct, return the user data
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    // if any error occurs, return the error message
    return res.status(500).json({ success: false, message: error.message });
  }
});

// route for getting moderator details
router.get("/moderator-details", validateUser, async (req, res) => {
  try {
    // get the role from middleware
    const role = req.user.role;

    // handle the case if role doesn't matches with the expected role
    if (role !== "moderator") {
      return res
        .status(403)
        .json({ success: false, message: "You are not a moderator" });
    }

    //  get the user details from the database
    const user = await User.findOne({ _id: req.user._id }).select("-password");

    // check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // if everything is correct, return the user data
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    // if any error occurs, return the error message
    return res.status(500).json({ success: false, message: error.message });
  }
});

// route for getting user details
router.get("/user-details", validateUser, async (req, res) => {
  try {
    // get the role from middleware
    const role = req.user.role;

    // handle the case if role doesn't matches with the expected role
    if (role !== "user") {
      return res
        .status(403)
        .json({ success: false, message: "You are not a user" });
    }

    //  get the user details from the database
    const user = await User.findOne({ _id: req.user._id }).select("-password");

    // check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // if everything is correct, return the user data
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    // if any error occurs, return the error message
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
