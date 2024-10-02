const bcrypt = require("bcrypt");
const userModel = require("../../models/userModel");

async function signup(req, res) {
  try {
    const { name, email, phone, password, confirmPassword } = req.body;
    if (!name || !email || !phone || !password || !confirmPassword) {
      throw new Error("All fields are required");
    }

    if (password !== confirmPassword) {
      throw new Error("Password does not match.");
    }

    const regex = new RegExp(email, "i");
    const userCheck = await userModel.findOne({ email: regex });

    if (userCheck) {
      throw new Error("Email is being used.");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something went wrong");
    }

    const payload = {
      name,
      email,
      phone,
      role: "GENERAL",
      password: hashPassword,
    };

    const user = await new userModel(payload);
    const saveUser = await user.save();

    res.status(201).json({
      message: "User Created Successfully", 
      data: saveUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message, 
    });
  }
}

module.exports = signup;
