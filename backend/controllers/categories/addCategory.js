const categoryModel = require("../../models/categoryModel");

async function addCategory(req, res) {
  try {
    const { categoryName } = req.body;
    if (!categoryName) {
      throw new Error("The name field is required");
    }
    const category = await categoryModel.findOne({ categoryName });
    if (category) {
      throw new Error("Category Name already exists");
    }

    const addCategory = await categoryModel.create(req.body);

    if (!addCategory) {
      throw new Error("Something went wrong");
    }

    res.status(200).json({ data: addCategory, message: "Category Created" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = addCategory;
