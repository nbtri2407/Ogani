const productModel = require("../../models/productModel");

async function deleteProduct(req, res) {
  try {
    const { _id } = req.body;
    const product = await productModel.findByIdAndDelete(_id);

    if (!product) {
      throw new Error("Something went wrong");
    }

    res.status(200).json({ data: product, message: "Product Deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = deleteProduct;
