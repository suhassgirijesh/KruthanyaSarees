const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// TEST ROUTE (check if route works)
router.get("/test", (req, res) => {
  res.json({ message: "Products route working ✅" });
});

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;