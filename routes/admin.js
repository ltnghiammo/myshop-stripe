const express = require("express");
const Order = require("../models/Order");
const { isAuth, isAdmin } = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

router.get("/admin/orders", isAuth, isAdmin, async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  const enriched = await Promise.all(
    orders.map(async order => {
      const user = await User.findById(order.userId);
      return {
        ...order.toObject(),
        userEmail: user ? user.email : "Unknown"
      };
    })
  );
  res.json(enriched);
});

module.exports = router;
