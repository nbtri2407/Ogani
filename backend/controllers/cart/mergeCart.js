const cartItemModel = require("../../models/cartItemModel");

async function mergeCart(req, res) {
  try {
    const { cartItems } = req.body;
    const userId = req?.userId;

    if (cartItems) {
      for (const item of cartItems) {
        const existingItem = await cartItemModel
          .findOne({
            user: userId,
            product: item.product,
            size: item.size,
          })
          .populate("product");

        if (existingItem && existingItem.quantity != item.quantity) {
          existingItem.quantity = item.quantity;
          await existingItem.save();
        }
        if (!existingItem) {
          const newCartItem = new cartItemModel({
            user: userId,
            product: item.product,
            size: item.size,
            quantity: item.quantity,
          });
          await newCartItem.save(); // Save the new cart item
        }
      }
    }

    const userCarts = await cartItemModel
      .find({ user: userId })
      .populate("product");

    res.status(200).json({
      message: "Cart merged successfully",
      data: userCarts,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

module.exports = mergeCart;
