const mongoose = require("mongoose");

const orderDetailModel = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    size: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("orderDetail", orderDetailModel);
