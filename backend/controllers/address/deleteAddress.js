const addressModel = require("../../models/addressModel");

async function deleteAddress(req, res) {
  try {
    const { addressId } = req.body;
    console.log();
    
    await addressModel.findByIdAndDelete(addressId);
    res.status(200).json({ message: "Xoá địa chỉ thành công" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = deleteAddress;
