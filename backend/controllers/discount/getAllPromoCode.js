const promoCodeModel = require("../../models/promoCodeModel");

async function getAllPromoCode(req, res) {
  try {
    const today = new Date();
    await promoCodeModel.updateMany(
      { expiryDate: { $lt: today }, status: "active" },
      { $set: { status: "inactive" } }
    );
    const promoCodes = await promoCodeModel.find();
    res.status(200).json({ data: promoCodes });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = getAllPromoCode;
