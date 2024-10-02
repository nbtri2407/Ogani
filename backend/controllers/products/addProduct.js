const productModel = require("../../models/productModel");

async function addProduct(req, res) {
  try { 
    const { productName } = req.body;
    if (!productName) {
      throw new Error("The name field is required");
    }
    const product = await productModel.findOne({ productName });
    if (product) {
      throw new Error("Product Name already exists");
    }

    const addProduct = await productModel.create(req.body);

    if (!addProduct) {
      throw new Error("Something went wrong");
    }

    res.status(200).json({ data: addProduct, message: "Product Created" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = addProduct;
