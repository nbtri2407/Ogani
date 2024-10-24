const axios = require("axios").default;
const CryptoJS = require("crypto-js");
const moment = require("moment");
const orderModel = require("../../models/orderModel");
async function refundPayment(req, res) {
  try {
    const { orderId, zp_trans_id, amount } = req.body;

    console.log("zp_trans_id", `${zp_trans_id}`);
    console.log("zp_trans_id", typeof `${zp_trans_id}`);
    console.log("zp_trans_id", zp_trans_id);
    console.log("zp_trans_id", typeof zp_trans_id);
    console.log("amount", amount);

    const config = {
      app_id: "2553",
      key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
      key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
      refund_url: "https://sb-openapi.zalopay.vn/v2/refund",
    };

    const timestamp = Date.now();
    const uid = `${timestamp}${Math.floor(111 + Math.random() * 999)}`; // unique id

    let params = {
      app_id: config.app_id,
      m_refund_id: `${moment().format("YYMMDD")}_${config.app_id}_${uid}`,
      timestamp, // miliseconds
      zp_trans_id: zp_trans_id, // zp_trans_id
      amount: amount,
      description: "ZaloPay Refund",
    };
    console.log("params", params);

    let data =
      params.app_id +
      "|" +
      params.zp_trans_id +
      "|" +
      params.amount +
      "|" +
      params.description +
      "|" +
      params.timestamp;
      
    params.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
    console.log("params2", params);
    console.log("data", data);

    const result = await axios.post(config.refund_url, null, { params });
    console.log(result.data);

    const returnCode = result.data.return_code;

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại." });
    }
    if (returnCode == 1) {
      order.paymentStatus = "Đã hoàn tiền";
    } else if (returnCode == 2) {
      order.paymentStatus = "Hoàn tiền thất bại";
    } else if (returnCode == 3) {
      order.paymentStatus = "Đang xử lý hoàn tiền";
    }

    if ([1, 2, 3].includes(returnCode)) order.status = "Đã huỷ";
    await order.save();

    res.status(200).json({
      message: "Đã huỷ đơn hàng và hoàn tiền",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = refundPayment;
