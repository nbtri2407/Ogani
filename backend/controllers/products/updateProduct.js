const productModel = require("../../models/productModel");

async function updateProduct(req, res) {
  try {
    const { product } = req.body; 
    
    if (
      product.productName === "" === "" ||
      product.imageUrl === "" ||
      product.description === "" ||
      product.category === ""
    ) {
      throw new Error("All  fields are required");
    }

    const updatedProduct = await productModel.findByIdAndUpdate(product._id, {
      productName: product.productName,
      imageUrl: product.imageUrl, 
      description: product.description,  
      size: product.size,
      category: product.category,
    });

    if (!updatedProduct) {
      throw new Error("Something went wrong");
    }

    res.status(200).json({ data: updatedProduct, message: "Product Updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = updateProduct;
