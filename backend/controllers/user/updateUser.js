const userModel = require("../../models/userModel");

async function updateInfoUser(req, res) {
  try {
    const userId = req?.userId;
    const { name, email, phone } = req.body;

    const user = await userModel.findByIdAndUpdate(userId, {
      name,
      email,
      phone,
    });
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

module.exports = updateInfoUser;
