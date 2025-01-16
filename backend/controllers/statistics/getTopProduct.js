const productModel = require("../../models/productModel");

async function getTopProduct(req, res) {
  try {
    const topRatedProducts = await productModel
      .find({ ratingCount: { $ne: 0 } })
      .sort({ ratingCount: -1 })
      .limit(6);
    const topSoldProducts = await productModel
      .find({ sold: { $ne: 0 } })
      .sort({ sold: -1 })
      .limit(6);

    const latestProducts = await productModel
      .find()
      .sort({ createdAt: -1 })
      .limit(6);

    res.status(200).json({
      topRatedProducts,
      topSoldProducts,
      latestProducts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = getTopProduct;
