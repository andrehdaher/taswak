const express = require("express");
const product = require("../models/product"); // Mongoose model
const router = express.Router();

// GET /product/:type
router.get("/product/:type", async (req, res) => {
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
//الاضافة الى المفضلة
router.post("/product/:type/favorite/:favorite", async (req, res) => {
  const idProduct = req.params.favorite;
  try {
    const favProduct = await product.findByIdAndUpdate(
      { _id: idProduct },
      { favorite: true },
      { new: true }
    );
    res.status(200).json("add to favorite");
  } catch (err) {
      res.status(401).json(err)
    console.log(err);
  }
});

//الاضافة الى السلة
router.post("/product/:type/cart/:favorite", async (req, res) => {
  const idProduct = req.params.favorite;
  try{
  const cartProduct =await product.findByIdAndUpdate(
    {_id :idProduct},
    {inInvoice :true},
    {new: true}
  )
  res.status(200).json("add to favorite");
}catch(err){
  res.status(401).json(err)
  console.log(err)
}
});

module.exports = router;
