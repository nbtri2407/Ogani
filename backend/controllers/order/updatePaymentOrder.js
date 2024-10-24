const orderModel = require("../../models/orderModel");

async function updatePaymentOrder(req, res) {
  try {
    const { orderId, status } = req.body;

    const orders = await orderModel.findByIdAndUpdate(orderId, {
      $set: {
        paymentStatus: status,
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

module.exports = updatePaymentOrder;
