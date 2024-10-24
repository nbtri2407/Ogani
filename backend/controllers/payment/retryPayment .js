const axios = require("axios").default;
const CryptoJS = require("crypto-js");
const moment = require("moment");
const orderModel = require("../../models/orderModel");

const retryPayment = async (req, res) => {
  const { orderId, appTransId, amount } = req.body;
  console.log("retryPayment");
  console.log("appTransId", appTransId);
  console.log("amount", amount);

  //   const orderStatus = await checkPayment(appTransId);

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

  try {
    const transID = Math.floor(Math.random() * 1000000);
    let app_trans_id = appTransId;
    if (appTransId == undefined) {
      app_trans_id = `${moment().format("YYMMDD")}_${transID}`;

      await orderModel.findByIdAndUpdate(orderId, {
        $set: {
          orderId: app_trans_id,
        },
      });
    }
    // Gọi lại API ZaloPay để tạo liên kết thanh toán mới cho đơn hàng
    const order = {
      app_id: config.app_id,
      app_trans_id: app_trans_id, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
      app_user: "user123",
      app_time: Date.now(), // miliseconds
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: amount,
      callback_url: "https://6afe-116-98-63-209.ngrok-free.app/api/callback",
      description: `Ogani - Payment for the order #${transID}`,
      bank_code: "",
    };

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

    const result = await axios.post(config.endpoint, null, { params: order });

    return res.status(200).json({
      data: result.data,
      appTransId: order.app_trans_id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = retryPayment;
