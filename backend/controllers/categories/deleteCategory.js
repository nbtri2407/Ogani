const categoryModel = require("../../models/categoryModel");

async function deleteCategory(req, res) {
  try {
    const { _id } = req.body;
    const category = await categoryModel.findByIdAndDelete(_id);

    if (!category) {
      throw new Error("Something went wrong");
    }

    res.status(200).json({ data: category, message: "Category Deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = deleteCategory;
