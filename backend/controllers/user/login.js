const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("All fields are required");
    }

    const regex = new RegExp(email, "i");
    const user = await userModel.findOne({ email: regex });
    if (!user) {
      throw new Error("This email is not a registered user!");
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      throw new Error("Wrong password!");
    } else {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };

      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: 60 * 60 * 8,
      });

      const cookieOption = {
        httpOnly: true,
        secure: true,
      };

      res.cookie("token", token, cookieOption).json({
        message: "Login successfully!",
        data: token,
        role: user.role,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

module.exports = login;
