const categoryModel = require("../../models/categoryModel");
const productModel = require("../../models/productModel");

async function getCategoryById(req, res) {
  try {
    const { categoryId } = req.query;

    const category = await categoryModel.findById(categoryId);
    const products = await productModel
      .find({ category: categoryId, sold: { $ne: 0 } })
      .sort({ sold: -1 })
      .limit(6);

    res.status(200).json({
      status: true,
      category,
      products,
      message: "All categories",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

module.exports = getCategoryById;
