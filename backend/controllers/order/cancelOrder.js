const orderModel = require("../../models/orderModel");
const refundPayment = require("../payment/refundPayment");

async function cancelOrder(req, res) {
  try {
    const { orderId } = req.body;

    const orders = await orderModel.findByIdAndUpdate(orderId, {
      $set: {
        status: "Đã huỷ",
        paymentStatus: "Đã huỷ",
      },
    });

    res.status(200).json({
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = cancelOrder;
