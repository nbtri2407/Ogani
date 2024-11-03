const promoCodeModel = require("../../models/promoCodeModel");

async function addPromoCode(req, res) {
  try {
    const { promoCode } = req.body;
    const promoCodeExist = await promoCodeModel.findOne({
      code: promoCode.code,
    });
    if (promoCodeExist) {
      return res.status(400).json({ message: "Mã giảm giá đã tồn tại" });
    }
    await promoCodeModel.create(promoCode);
    res.status(201).json({ message: "Tạo mã giảm giá thành công" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = addPromoCode;
