const User = require("../models/User");

const isAuth = async (req, res, next) => {
  if (!req.session.userId) return res.status(401).json({ error: "Unauthorized" });
  req.user = await User.findById(req.session.userId);
  if (!req.user) return res.status(401).json({ error: "User not found" });
  next();
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Forbidden - Admins only" });
  next();
};

module.exports = { isAuth, isAdmin };
