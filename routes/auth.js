// routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");

// POST /api/signup
router.post("/singup", async (req, res) => {
  try {
    const { fullName, number, location, landmark } = req.body;

    if (!fullName || !number) {
      return res.status(400).json({ message: "يرجى تعبئة الاسم ورقم الهاتف" });
    }

    const existingUser = await User.findOne({ fullName });
    if (existingUser) {
      return res.status(409).json({ message: "الاسم موجود مسبقًا، يرجى اختيار اسم مختلف او سجل الدخول" });
    }

    const newUser = new User({
      fullName,
      number,
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

// ✅ تسجيل الدخول باستخدام الاسم الثلاثي والرقم
router.post("/login", async (req, res) => {
  const { fullName, number } = req.body;
  try {
    // تحقق من وجود المستخدم في قاعدة البيانات
    const user = await User.findOne({ fullName, number });

    if (!user) {
      return res.status(404).json({ message: "المستخدم غير موجود" });
    }

    // تسجيل الدخول ناجح
    res.status(200).json({ message: "تم تسجيل الدخول بنجاح" });
  } catch (err) {
    res.status(500).json({ message: "خطأ في السيرفر" });
  }
});

module.exports = router;
