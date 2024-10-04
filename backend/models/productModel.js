const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productModel = new Schema(
  {
    productName: String,
    imageUrl: [],
    description: String,
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    size: {
      "100G": {
        quantity: { type: Number, min: 0, required: true },
        price: { type: Number, min: 0, required: true },
      },
      "500G": {
        quantity: { type: Number, min: 0, required: true },
        price: { type: Number, min: 0, required: true },
      },
      "1KG": {
        quantity: { type: Number, min: 0, required: true },
        price: { type: Number, min: 0, required: true },
      },
      "5KG": {
        quantity: { type: Number, min: 0, required: true },
        price: { type: Number, min: 0, required: true },
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("product", productModel);
