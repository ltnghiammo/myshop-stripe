
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
