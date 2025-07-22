// server.js أو index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
require('dotenv').config();


const app = express();

// إعدادات
app.use(cors());
app.use(express.json());


// ربط المسارات
app.use("/api", authRoutes);


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
