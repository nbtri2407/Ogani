const mongoose = require("mongoose");

const cartItemModel = new mongoose.Schema(
  {
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cartItem", cartItemModel);
