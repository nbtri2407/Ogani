const productModel = require("../../models/productModel");
const userModel = require("../../models/userModel");

async function getRecommendations(req, res) {
  try {
    const userId = req.userId;
    const user = await userModel.findOne({ _id: userId });

    const likedProducts = await productModel.find({
      _id: { $in: user.wishList },
    });

    const allProducts = await productModel.find({
      _id: { $nin: user.wishList },
    });

    const likedCategories = new Set(
      likedProducts.map((product) => product.category.toString())
    );

    const recommendations = allProducts.filter((product) =>
      likedCategories.has(product.category.toString())
    );
    const recommended = new Set(
      recommendations.map((product) => product._id.toString())
    );

    const recommendations2 = allProducts.filter((product) =>
      !recommended.has(product._id.toString())
    );

    const products2 = recommendations2.slice(
      0,
      8 - recommendations.slice(0, 8).length
    );

    res.status(200).json({
      products: recommendations.slice(0, 8),
      products2,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = getRecommendations;
