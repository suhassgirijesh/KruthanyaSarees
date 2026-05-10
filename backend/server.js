const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();


// ======================
// CORS
// ======================
app.use(cors({
  origin: true,
  credentials: true
}));


// ======================
// MIDDLEWARE
// ======================
app.use(express.json());

// ======================
// STATIC FILES
// ======================
app.use('/uploads', express.static('uploads'));
app.use('/images', express.static('public/images'));


// ======================
// MONGODB CONNECTION
// ======================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("MongoDB error:", err));


// ======================
// ROUTES IMPORT
// ======================
const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/orders");
const paymentRoutes = require("./routes/payment");
const userRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin");


// ======================
// API ROUTES
// ======================
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);


// ======================
// TEST ROOT
// ======================
app.get("/", (req, res) => {
  res.send("KRUTHANYA SAREES API is running 🚀");
});


// ======================
// ERROR HANDLER
// ======================
app.use((err, req, res, next) => {

  console.error("SERVER ERROR:", err);

  res.status(500).json({
    success: false,
    message: "Server Error"
  });

});


// ======================
// START SERVER
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});