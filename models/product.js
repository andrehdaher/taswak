const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  type: {
    type: String,
    required: true,
    enum: ["food", "canned", "drinks", "smoke", "sweets", "snacks", "shampoo", "cleaners"],
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String, // يمكنك تخزين رابط الصورة (URL) أو base64
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
