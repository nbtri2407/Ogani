const addressModel = require("../../models/addressModel");

async function updateAddress(req, res) {
  try {
    const { data } = req.body;

    if (
      data.receiver.trim() == "" ||
      data.phone.trim() == "" ||
      data.home.trim() == ""
    ) {
      return res.status(400).json({ message: "Hãy điền đầy đủ thông tin" });
    }

    if (data.province.name == null || data.district.name == null) {
      return res
        .status(400)
        .json({ message: "Hãy chọn đầy đủ tỉnh thành, huyện và xã" });
    }

    await addressModel.findByIdAndUpdate(data.addressId, {
      $set: {
        receiver: data.receiver,
        phone: data.phone,
        province: data.province,
        district: data.district,
        ward: data.ward,
        home: data.home,
      },
    });
    res.status(200).json({ message: "Address Updated" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = updateAddress;
