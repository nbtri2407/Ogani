const orderDetailModel = require("../../models/orderDetailModel");
const orderModel = require("../../models/orderModel");
const productModel = require("../../models/productModel");

async function feedBackOrder(req, res) {
  console.log();

  try {
    const { orderId, rating, message } = req.body;
    rating.map(async (item, index) => {
      await orderDetailModel.findByIdAndUpdate(item._id, {
        $set: {
          rating: item.rating,
        },
      });

      const product = await productModel.findById(item.productId);  

      const totalRating = product.averageRating * product.ratingCount; 

      const newAverageRating =
        +(totalRating + +item.rating) / +(product.ratingCount + 1);
 
      product.averageRating = Math.round(newAverageRating);
      product.ratingCount += 1;
      await product.save();
    });

    const order = await orderModel.findById(orderId);
    order.feedBack = message;
    order.status = "Hoàn thành";
    await order.save();

    res.status(200).json({
      message: "Đánh giá thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = feedBackOrder;
