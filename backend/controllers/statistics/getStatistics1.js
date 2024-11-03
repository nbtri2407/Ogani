const orderModel = require("../../models/orderModel");
const productModel = require("../../models/productModel");
const userModel = require("../../models/userModel");

async function getStatistics1(req, res) {
  try {
    const revenue = await orderModel.aggregate([
      {
        $match: {
          status: { $in: ["Hoàn thành", "Đã nhận hàng"] },
          paymentStatus: "Đã thanh toán",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$priceCheckout" },
          //   totalOrders: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          //   totalOrders: 1,
        },
      },
    ]);

    const result = revenue[0] || { totalRevenue: 0 };

    const countProduct = await productModel.countDocuments();
    const countUser = await userModel.countDocuments();
    const countOrder = await orderModel.countDocuments();

    res.status(200).json({
      totalRevenue: result.totalRevenue,
      countOrder,
      countProduct,
      countUser,
    });
  } catch (error) {
    console.error("Error applying promo code:", error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = getStatistics1;
