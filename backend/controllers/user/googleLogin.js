const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const userModel = require("../../models/userModel");

async function googleLogin(req, res) {
  const client = new OAuth2Client(process.env.CLIENT_ID);

  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload(); 

    const { sub, email, name, picture } = payload;

    let user = await userModel.findOne({ googleId: sub });
    if (!user) {
      user = new userModel({
        googleId: sub,
        email,
        name,
        role: "GENERAL",
        picture,
      });
      await user.save();
    } 
    // Tạo JWT cho người dùng
    const userToken = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: 60 * 60 * 8 }
    );

    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("token", userToken, cookieOption).json({
      message: "Login successfully!",
      data: userToken,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({
      error: "loi Google Login",
      message: error.message,
    });
  }
}

module.exports = googleLogin;
