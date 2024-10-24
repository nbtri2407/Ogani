const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderModel = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    orderId: { type: String },
    zpTransId: { type: String },
    totalAmount: { type: Number, required: true },
    shippingFee: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    priceCheckout: { type: Number, required: true },
    status: {
      type: String,
      enum: [
        "Chờ xác nhận",
        "Đã xác nhận",
        "Đang vận chuyển",
        "Đã yêu cầu huỷ",
        "Đã huỷ",
        "Đã nhận hàng",
        "Hoàn thành",
      ],
      default: "Chờ xác nhận",
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "address",
      required: true,
    },
    shippingMethod: {
      type: String,
      enum: ["standard", "express"],
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "zalo"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: [
        "Chưa thanh toán",
        "Thanh toán khi nhận hàng",
        "Đã thanh toán",
        "Đang xử lý hoàn tiền",
        "Hoàn tiền thất bại",
        "Đã hoàn tiền",
        "Đã huỷ",
        "Lỗi",
      ],
      default: "Chưa thanh toán",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("order", orderModel);
