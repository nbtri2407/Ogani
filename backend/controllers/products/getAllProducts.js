const productModel = require("../../models/productModel");

async function getAllProducts(req, res) {
  try {
    const { page, limit } = req.query;

    const products = await productModel
      .find().populate("category")
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      status: true,
      data: products,
      message: "All products",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

module.exports = getAllProducts
