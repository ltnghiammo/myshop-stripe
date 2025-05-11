const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ email, password: hashed });
    req.session.userId = user._id;
    res.json({ message: "Registered", user: { email: user.email } });
  } catch (err) {
    res.status(400).json({ error: "Email already exists" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "Invalid email" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: "Invalid password" });

  req.session.userId = user._id;
  res.json({ message: "Logged in", user: { email: user.email } });
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => res.json({ message: "Logged out" }));
});

// Get current user
router.get("/me", async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: "Not logged in" });
  const user = await User.findById(req.session.userId);
  if (!user) return res.status(401).json({ error: "User not found" });
  res.json({ email: user.email });
});

module.exports = router;
