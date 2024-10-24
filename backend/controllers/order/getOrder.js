const orderModel = require("../../models/orderModel");

async function getOrder(req, res) {
  try {
    const userId = req.userId; 
    const orders = await orderModel.find({ user: userId }).populate("address");

    res.status(200).json({
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = getOrder;
