const orderDetailModel = require("../../models/orderDetailModel");
const orderModel = require("../../models/orderModel");
const productModel = require("../../models/productModel");
const promoCodeModel = require("../../models/promoCodeModel");

async function createOrder(req, res) {
  try {
    const userId = req.userId;
    const {
      orderItem,
      totalAmount,
      shippingFee,
      discount,
      priceCheckout,
      address,
      shippingMethod,
      paymentMethod,
      promoCode,
    } = req.body;

    const newOrder = await orderModel.create({
      user: userId,
      totalAmount,
      shippingFee,
      discount,
      priceCheckout,
      address,
      paymentStatus: "Thanh toán khi nhận hàng",
      shippingMethod,
      paymentMethod,
    });

    if (discount > 0) {
      const promo = await promoCodeModel.findOne({
        code: promoCode.toUpperCase(),
      });
      promo.usedCount += 1;
      await promo.save();
    }

    for (const item of orderItem) {
      if (!(item.product.size[item.size].quantity > 0)) {
        return res.status(400).json({
          message: "Có sản phẩm không đủ hàng. Vui lòng cập nhật lại giỏ hàng",
        });
      }
    }

    for (const item of orderItem) {
      if (item.product.size[item.size].quantity > 0) {
        const product = await productModel.findById(item.product._id);

        if (!product) {
          throw new Error("Product not found");
        }

        product.size[item.size].quantity -= item.quantity;
        product.sold += 1;
        await product.save();

        await orderDetailModel.create({
          order: newOrder._id,
          product: item.product,
          size: item.size,
          quantity: item.quantity,
        });
      }
    }

    res.status(200).json({
      message: "Order created successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

module.exports = createOrder;
