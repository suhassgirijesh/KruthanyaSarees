const express = require("express");
const router = express.Router();

// TEST ROUTE
router.get("/test", (req, res) => {
  res.json({ message: "Products route working ✅" });
});

// MAIN ROUTE
router.get("/", (req, res) => {
  res.json({ message: "Products API working 🔥" });
});

module.exports = router;