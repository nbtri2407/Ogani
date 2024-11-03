const formatPrice = require("../../helper/formatPrice");
const promoCodeModel = require("../../models/promoCodeModel");

const applyPromoCode = async (req, res) => {
  const { code, orderTotal } = req.body;

  try {
    const promo = await promoCodeModel.findOne({
      code: code.toUpperCase(),
      status: "active",
    });

    if (!promo) {
      return res
        .status(400)
        .json({ message: "Mã giảm giá không hợp lệ hoặc đã hết hạn." });
    }

    const today = new Date();
    if (new Date(promo.expiryDate) < today) {
      return res.status(400).json({ message: "Mã giảm giá đã hết hạn." });
    }

    if (promo.usageLimit && promo.usedCount >= promo.usageLimit) {
      return res
        .status(400)
        .json({ message: "Mã giảm giá đã đạt giới hạn sử dụng." });
    }

    if (promo.minOrderValue && orderTotal < promo.minOrderValue) {
      return res.status(400).json({
        message: `Đơn hàng của bạn cần đạt tối thiểu ${formatPrice(
          promo.minOrderValue
        )} để sử dụng mã giảm giá này.`,
      });
    }

    let discountAmount;
    if (promo.discountType === "percentage") {
      discountAmount = (orderTotal * promo.discountValue) / 100;
    } else if (promo.discountType === "amount") {
      discountAmount = promo.discountValue;
    }

    discountAmount = Math.min(discountAmount, orderTotal);

    // const finalTotal = orderTotal - discountAmount;

    res.json({
      message: "Áp dụng mã giảm giá thành công.",
      discountAmount,
      promoCode: promo.code,
    });
  } catch (error) {
    console.error("Error applying promo code:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi áp dụng mã giảm giá." });
  }
};

module.exports = applyPromoCode;
