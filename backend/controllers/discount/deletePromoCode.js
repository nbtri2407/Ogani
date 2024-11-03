const promoCodeModel = require("../../models/promoCodeModel");

async function deletePromoCode(req, res) {
  try {

    const { promoCodeId } = req.body;
    console.log(promoCodeId);
    console.log("req.body",req.body);
    
    const promoCodeExist = await promoCodeModel.findOne({
      _id: promoCodeId,
    });
    if (!promoCodeExist) {
      return res.status(400).json({ message: "Mã giảm giá không tồn tại" });
    }
    await promoCodeModel.findByIdAndDelete(promoCodeId);
    res.status(201).json({ message: "Đã xoá mã giảm giá" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = deletePromoCode;
