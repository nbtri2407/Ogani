const userModel = require("../../models/userModel");

async function getAllUsers(req, res) {
  try {
    const { page, limit } = req.query;

    const users1 = await userModel.find();

    const users = await userModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit);

    const totalItems = users1?.length;
    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({
      status: true,
      data: users,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
      },
      message: "All products",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

module.exports = getAllUsers;
