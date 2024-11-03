const promoCodeModel = require("../../models/promoCodeModel");

async function updatePromoCode(req, res) {
  try {
    const { promoCode } = req.body;
    const promoCodeExist = await promoCodeModel.findOne({
      code: promoCode.code,
    });

    const promoCodeUpdate = await promoCodeModel.findById(promoCode._id);

    if (promoCodeExist && promoCodeExist.code !== promoCodeUpdate.code) {
      return res.status(400).json({ message: "Mã giảm giá đã tồn tại" });
    } else {
      promoCodeUpdate.discountType = promoCode.discountType;
      promoCodeUpdate.discountValue = +promoCode.discountValue;
      promoCodeUpdate.expiryDate = promoCode.expiryDate;
      promoCodeUpdate.usageLimit = +promoCode.usageLimit;
      promoCodeUpdate.minOrderValue = +promoCode.minOrderValue;
      await promoCodeUpdate.save();

      return res
        .status(200)
        .json({ message: "Cập nhật mã giảm giá thành công" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = updatePromoCode;
