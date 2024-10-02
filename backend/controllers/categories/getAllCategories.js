const categoryModel = require("../../models/categoryModel");


async function getAllCategory(req, res) {
  try {
    const { page, limit } = req.query;

    const categories1 = await categoryModel.find();

    const categories = await categoryModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit);

    const totalItems = categories1?.length;
    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({
      status: true,
      data: categories,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
      },
      message: "All categories",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

module.exports = getAllCategory;
