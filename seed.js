const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose.connect("mongodb+srv://admin:Nghia2025@cluster0.nx405we.mongodb.net/myshop?retryWrites=true&w=majority&appName=Cluster0").then(async () => {
  await Product.deleteMany({});
  await Product.insertMany([
    { name: "Notebook", price: 4.5, stock: 30, category: "Stationery" },
    { name: "Pen", price: 1.2, stock: 100, category: "Stationery" },
    { name: "Backpack", price: 25.0, stock: 15, category: "Bags" },
    { name: "Water Bottle", price: 10.0, stock: 40, category: "Accessories" }
  ]);
  console.log("Sample products added");
  process.exit();
});
