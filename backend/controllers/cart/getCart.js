const cartItemModel = require("../../models/cartItemModel");

async function getCart(req, res) {
  try {
    const userId = req?.userId;
    const userCarts = await cartItemModel.find({ user: userId });

    res.status(200).json({
      message: "Cart merged successfully",
      cart: userCarts,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

module.exports = getCart;
