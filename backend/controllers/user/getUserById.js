const userModel = require("../../models/userModel");

async function getUserById(req, res) {
  try {
    const userId = req?.userId;
    if (userId) {
      await userModel
        .findById(userId)
        .populate("wishList")
        .then((user) => {
          res.status(200).json({
            message: "User Details",
            data: user,
          });
        })
        .catch((error) => {
          res.status(400).json({
            message: error,
          });
        });
    } else {
      res.status(200).json({
        message: "Not user login",
        data: null,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

module.exports = getUserById;
