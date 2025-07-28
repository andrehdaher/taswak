// server.js أو index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const getProduct = require("./routes/getProduct");
const path = require("path");
const addProduct = require("./routes/addProduct");
require('dotenv').config();


const app = express();

// إعدادات
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());


// ربط المسارات
app.use("/api", authRoutes);


app.use("/api", getProduct);
app.use("/api", addProduct);


app.get('/', (req, res) => {
  res.send('API is running...');
});




// Connect DB and start server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  } catch (err) {
    console.error(err.message);
  }
};

startServer();
