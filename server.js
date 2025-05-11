require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();
app.use(express.static("public"));
app.use(express.json());
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
    success_url: "http://localhost:4242/success.html",
    cancel_url: "http://localhost:4242/cart.html"
  });
  res.json({ url: session.url });
});
app.listen(4242, () => console.log("Ready"));