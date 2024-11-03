const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req?.cookies?.token;  
    
    if (token !== undefined) {
      jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
        if (!token) {
          res.status(200).json({
            message: "Hãy đăng nhập trước", 
          });
        }
        if (err) {
          return res.sendStatus(403);
        }

        req.userId = decoded?._id;
        next();
      });
    } else {
      res.status(401).json({
        message: "Hãy đăng nhập trước", 
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      data: [], 
    });
  }
}

module.exports = authToken;
