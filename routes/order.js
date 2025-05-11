const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

// Save order
router.post("/orders", async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: "Unauthorized" });
  const { items, total } = req.body;
  const order = await Order.create({
    userId: req.session.userId,
    items,
    total
  });
  res.json(order);
});

// Get user's orders
router.get("/orders", async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: "Unauthorized" });
  const orders = await Order.find({ userId: req.session.userId }).sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = router;
