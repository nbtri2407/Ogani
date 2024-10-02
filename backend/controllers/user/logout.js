async function logout(req, res) {
  try {
    res.clearCookie("token").status(200).json({
      message: "Logout successfully.", 
    });
  } catch (error) {
    res.status(400).json({
      message: error.message, 
    });
  }
}

module.exports = logout;
