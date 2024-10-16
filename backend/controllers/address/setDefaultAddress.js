const addressModel = require("../../models/addressModel");

async function setDefaultAddress(req, res) {
  try {
    const userId = req?.userId;
    const { addressId } = req.body;

    await addressModel.findOneAndUpdate(
      { user: userId, isDefault: true },
      {
        $set: { isDefault: false },
      }
    );

    await addressModel.findByIdAndUpdate(addressId, {
      $set: { isDefault: true },
    });

    res.status(200).json({
      message: "Cập nhật thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = setDefaultAddress;
