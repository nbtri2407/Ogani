const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const promotionModel = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("promoCode", promotionModel);
