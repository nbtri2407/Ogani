const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderModel = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    totalAmount: { type: Number, required: true },
    shippingFee: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    priceCheckout: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled", "refund"],
      default: "pending",
    },
    shippingAddress: {
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
      enum: ["cod", "momo"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("order", orderModel);
