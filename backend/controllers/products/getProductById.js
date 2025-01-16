const productModel = require("../../models/productModel");

async function productDetails(req, res) {
  try {
    const productId = req.query;

    const product = await productModel
      .findById(productId.productId)
      .populate("category");

    const products = await productModel.find({
      category: product.category,
      _id: { $ne: productId.productId },
    });

    const allProducts = await productModel.find({
      _id: { $ne: productId.productId },
    });

    const recommended = new Set(
      products.map((product) => product._id.toString())
    );

    const recommendations = allProducts.filter(
      (product) =>
        !recommended.has(product._id.toString())
    );

    res.status(200).json({
      status: true,
      data: product,
      products: products.slice(0, 8),
      recommendations: recommendations.slice(
        0,
        8 - products.slice(0, 8).length
      ),
      message: "Product details",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
}

module.exports = productDetails;
