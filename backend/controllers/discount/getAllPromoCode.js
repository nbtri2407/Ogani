const promoCodeModel = require("../../models/promoCodeModel");

async function getAllPromoCode(req, res) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    await promoCodeModel.updateMany(
      { expiryDate: { $lt: today }, status: "active" },
      { $set: { status: "inactive" } }
    );

    await promoCodeModel.updateMany(
      { expiryDate: { $gte: today }, status: "inactive" },
      { $set: { status: "active" } }
    );
    const promoCodes = await promoCodeModel.find();
    res.status(200).json({ data: promoCodes });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = getAllPromoCode;
