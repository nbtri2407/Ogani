const productModel = require("../../models/productModel");
const userModel = require("../../models/userModel");

async function addToWishList(req, res) {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    const user = await userModel.findById(userId);
    const product = await productModel.findById(productId);

    const isProductInWishlist = user.wishList.some((item) =>
      item.equals(productId)
    );

    if (!isProductInWishlist) {
      user.wishList.push(product);
      product.likes += 1;
    }

    await user.save();
    await product.save();
    res.status(200).json({ message: "Đã thêm vào yêu thích" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = addToWishList;
