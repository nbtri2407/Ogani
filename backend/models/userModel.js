const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      require: true,
    },
    phone: String,
    address: String,
    password: String,
    role: String,
    wishList: [
      {
        type: Schema.Types.ObjectId,
        ref: "product",
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("user", userModel);
