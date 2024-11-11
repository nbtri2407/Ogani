const productModel = require("../../models/productModel");
const userModel = require("../../models/userModel");

async function getProductByCategory(req, res) {
  try {
    const category = req.query.category;

    const products = await productModel.find({ category: category });

    res.status(200).json({
      products: products.slice(0, 8),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = getProductByCategory;
