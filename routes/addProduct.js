const express = require("express");
const Product = require('../models/product')
const multer = require("multer");



const router = express.Router();






// إعداد التخزين
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // مجلد حفظ الصور
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// رفع صورة واحدة فقط باسم "image"
const upload = multer({ storage: storage });

// المسار لإضافة منتج
router.post("/product", upload.single("image"), async (req, res) => {
  try {
    const { name, price, type, quantity } = req.body;
    const image = req.file ? req.file.filename : null;

    const product = new Product({
      name,
      price,
      type,
      quantity,
      image,
    });

    await product.save();
    res.status(201).json({ message: "تم حفظ المنتج بنجاح", product });
  } catch (err) {
    console.error("خطأ أثناء حفظ المنتج:", err);
    res.status(500).json({ error: "فشل حفظ المنتج" });
  }
});



module.exports = router;
