// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    unique: true, // لأنك ستستخدمه لتسجيل الدخول
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  landmark: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
