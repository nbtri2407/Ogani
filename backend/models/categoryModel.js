const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoryModel = new Schema(
  {
    categoryName: String,
    imageUrl:String,
    description: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('category',categoryModel)
