const axios = require("axios").default;
const CryptoJS = require("crypto-js");
const moment = require("moment");
const productModel = require("../../models/productModel");
const orderModel = require("../../models/orderModel");
const orderDetailModel = require("../../models/orderDetailModel");
const promoCodeModel = require("../../models/promoCodeModel");

async function payment(req, res) {
  console.log("payment");

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

  const config = {
    app_id: "2553",
    key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
    key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
    endpoint: "https://sb-openapi.zalopay.vn/v2/create",
  };

  const embed_data = {
    redirecturl: "http://localhost:3006/profile#order",
  };

  const items = [{}];
  const transID = Math.floor(Math.random() * 1000000);
  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format("YYMMDD")}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
    app_user: "user123",
    app_time: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: priceCheckout,
    callback_url: "https://c65f-2401-d800-f5b2-55ce-5045-c1f7-30a5-ec22.ngrok-free.app/api/callback",
    description: `Ogani - Payment for the order #${transID}`,
    bank_code: "",
  };

  // appid|app_trans_id|appuser|amount|apptime|embeddata|item
  const data =
    config.app_id +
    "|" +
    order.app_trans_id +
    "|" +
    order.app_user +
    "|" +
    order.amount +
    "|" +
    order.app_time +
    "|" +
    order.embed_data +
    "|" +
    order.item;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  try {
    const newOrder = await orderModel.create({
      user: userId,
      orderId: order.app_trans_id,
      totalAmount,
      shippingFee,
      discount,
      priceCheckout,
      address,
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
        throw new Error(
          "Có sản phẩm không đủ hàng. Vui lòng cập nhật lại giỏ hàng"
        );
      }
    }

    for (const item of orderItem) {
      if (item.product.size[item.size].quantity > 0) {
        const product = await productModel.findById(item.product._id);
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

    const result = await axios.post(config.endpoint, null, { params: order });

    return res.status(200).json({
      data: result.data,
      appTransId: order.app_trans_id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

module.exports = payment;
