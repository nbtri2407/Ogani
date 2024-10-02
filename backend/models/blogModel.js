const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogModel = new Schema(
  {
    title: { type: String, required: true },
    introduction: { type: String, required: true },
    imageUrl: [],
    mainContent: [
      {
        heading: { type: String, required: true },
        content: { type: String, required: true },
      },
    ],
    conclusion: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
  }, 
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("blog", blogModel);
