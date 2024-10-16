const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressModel = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    receiver: { type: String, required: true },
    phone: { type: String, required: true },
    province: {
      code: { type: Number, required: true },
      name: { type: String, required: true },
    },
    district: {
      code: { type: Number, required: true },
      name: { type: String, required: true },
    },
    ward: {
      code: { type: Number },
      name: { type: String },
    },
    home: { type: String, required: true },
    isDefault: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("address", addressModel);
