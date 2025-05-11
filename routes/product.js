const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Get all products
router.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add product (POST /products)
router.post("/products", async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

// Delete product
router.delete("/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
