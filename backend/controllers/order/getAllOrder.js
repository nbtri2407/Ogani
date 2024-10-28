const orderModel = require("../../models/orderModel");

async function getAllOrder(req, res) {
  try {
    const { page, limit } = req.query;
    const orders1 = await orderModel.find();
    const orders = await orderModel
      .find()
      .sort({ createdAt: -1 })
      .populate("address")
      .skip((page - 1) * limit)
      .limit(limit);

    const totalItems = orders1?.length;
    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({
      data: orders,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
      },
      message: "All orders",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = getAllOrder;
