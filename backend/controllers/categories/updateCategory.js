const categoryModel = require("../../models/categoryModel");

async function updateCategory(req, res) {
  try {
    const { _id, categoryName, description, imageUrl } = req.body;
    if (!categoryName) {
      throw new Error("The name field is required");
    }

    const category = await categoryModel.findById(_id);
    if (
      category.categoryName === categoryName &&
      category.description === description &&
      category.imageUrl === imageUrl
    ) {
      throw new Error("No changes made");
    }

    const updatedCategory = await categoryModel.findByIdAndUpdate(_id, {
      categoryName,
      description,
      imageUrl,
    });

    if (!updatedCategory) {
      throw new Error("Something went wrong");
    }

    res
      .status(200)
      .json({ data: updatedCategory, message: "Category Updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = updateCategory;
