const CryptoJS = require("crypto-js"); // npm install crypto-js
const orderModel = require("../../models/orderModel");
const orderDetailModel = require("../../models/orderDetailModel");

async function callBackPayment(req, res) {
  let result = {};
  console.log(req.body);

  const config = {
    app_id: "2553",
    key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
    key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
    endpoint: "https://sb-openapi.zalopay.vn/v2/create",
  };
  try {
    let dataStr = req.body.data;
    let reqMac = req.body.mac;

    let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
    console.log("mac =", mac);

    const dataJson = JSON.parse(dataStr);
    const app_trans_id = dataJson.app_trans_id; 

    // kiểm tra callback hợp lệ (đến từ ZaloPay server)
    if (reqMac !== mac) {
      await orderModel.findOneAndUpdate(
        { orderId: app_trans_id },
        {
          $set: {
            paymentStatus: "Lỗi",
          },
        }
      );

      result.return_code = -1;
      result.return_message = "mac not equal";
    } else {
      // thanh toán thành công
      await orderModel.findOneAndUpdate(
        { orderId: app_trans_id },
        {
          $set: {
            paymentStatus: "Đã thanh toán",
            status: "Đã xác nhận", 
            zpTransId:  dataJson.zp_trans_id, 

          },
        }
      );

      result.return_code = 1;
      result.return_message = "success";
    }
  } catch (ex) {
    console.log("lỗi:::" + ex.message);
    result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
    result.return_message = ex.message;
  }

  // thông báo kết quả cho ZaloPay server
  res.json(result);
}

module.exports = callBackPayment;
