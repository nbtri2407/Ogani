const orderDetailModel = require("../../models/orderDetailModel");

async function getOrderDetails(req, res) {
  try { 
    const orderId = req.params.orderId; 

    const orders = await orderDetailModel
      .find({ order: orderId })
      .populate("product");

    res.status(200).json({
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = getOrderDetails;
