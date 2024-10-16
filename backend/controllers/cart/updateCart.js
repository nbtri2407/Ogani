const cartItemModel = require("../../models/cartItemModel");

async function updateCart(req, res) {
  try {
    const { cartItems } = req.body;
    const userId = req?.userId;
    await cartItemModel.deleteMany({ user: userId });

    for (const item of cartItems) {
      const newCartItem = new cartItemModel({
        user: userId,
        product: item.product,
        size: item.size,
        quantity: item.quantity,
      });
      await newCartItem.save();
    }

    const userCarts = await cartItemModel.find({ user: userId }).populate("product");

    res.status(200).json({
      message: "Cart updated successfully",
      data: userCarts,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

module.exports = updateCart;
