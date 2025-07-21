// routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");

// POST /api/signup
router.post("/signup", async (req, res) => {
  try {
    const { fullName, phone, location, landmark } = req.body;

    if (!fullName || !phone) {
      return res.status(400).json({ message: "يرجى تعبئة الاسم ورقم الهاتف" });
    }

    const existingUser = await User.findOne({ fullName });
    if (existingUser) {
      return res.status(409).json({ message: "الاسم موجود مسبقًا، يرجى اختيار اسم مختلف او سجل الدخول" });
    }

    const newUser = new User({
      fullName,
      phone,
      location,
      landmark,
    });

    await newUser.save();

    res.status(201).json({ message: "تم التسجيل بنجاح" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "حدث خطأ في الخادم" });
  }
});

// ✅ تسجيل الدخول باستخدام الاسم الثلاثي فقط
router.post("/login", async (req, res) => {
  try {
    const { fullName } = req.body;

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ message: "يرجى إدخال الاسم الثلاثي" });
    }

    const user = await User.findOne({ fullName: fullName.trim() });

    if (!user) {
      return res.status(404).json({ message: "هذا الاسم غير مسجل" });
    }

    // نجاح
    res.status(200).json({ message: "تم تسجيل الدخول بنجاح", user });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

module.exports = router;
