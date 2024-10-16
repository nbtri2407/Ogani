const addressModel = require("../../models/addressModel");

async function getAllAddress(req, res) {
  try {
    const userId = req?.userId;

    const address = await addressModel
      .find({ user: userId })
      .sort({ isDefault: -1 });
    res.status(200).json({
      status: "success",
      data: address,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = getAllAddress;
