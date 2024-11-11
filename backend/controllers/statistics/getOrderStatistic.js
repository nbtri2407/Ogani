const orderModel = require("../../models/orderModel");
const productModel = require("../../models/productModel");
const userModel = require("../../models/userModel");

async function getOrderStatistic(req, res) {
  try {
    const orderCounts = await orderModel.aggregate([
      {
        $group: {
          _id: "$status", // Nhóm theo trường status
          count: { $sum: 1 }, // Đếm số lượng đơn hàng trong mỗi nhóm
        },
      },
      {
        $project: {
          status: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    const formattedData = orderCounts.reduce((acc, item) => {
      acc[item.status] = item.count; // Thêm status làm khóa và count làm giá trị
      return acc;
    }, {});

    res.status(200).json({ formattedData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = getOrderStatistic;
