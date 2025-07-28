const express = require("express");
const product = require('../models/product'); // Mongoose model
const router = express.Router();

// GET /product/:type
router.get('/product/:type', async (req, res) => {
  try {
    const type = req.params.type;

    // البحث عن المنتجات حسب التصنيف
    const products = await product.find({ type });

    // إرسال النتيجة
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

module.exports = router;
