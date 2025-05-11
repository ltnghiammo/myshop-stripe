require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Product = require("./models/Product");

const app = express();
app.use(express.json());
app.use(express.static("public"));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || "", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// Stripe Checkout
app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: req.body.items.map(i => ({
      price_data: {
        currency: "usd",
        product_data: { name: i.name },
        unit_amount: Math.round(i.price * 100),
      },
      quantity: i.quantity
    })),
    mode: "payment",
    success_url: "https://myshop-stripe.onrender.com/success.html",
    cancel_url: "https://myshop-stripe.onrender.com/cart.html"
  });
  res.json({ url: session.url });
});

// API: get all products
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Seed with image
app.get("/seed", async (req, res) => {
  await Product.deleteMany();
  await Product.insertMany([
    {
      name: "Pen",
      price: 1.2,
      stock: 10,
      image: "https://cdn-icons-png.flaticon.com/512/3004/3004601.png"
    },
    {
      name: "Notebook",
      price: 3.5,
      stock: 20,
      image: "https://cdn-icons-png.flaticon.com/512/4727/4727426.png"
    },
    {
      name: "Backpack",
      price: 15.0,
      stock: 5,
      image: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png"
    }
  ]);
  res.send("✅ Seeded with images!");
});

app.listen(4242, () => console.log("🚀 Server running on port 4242"));
