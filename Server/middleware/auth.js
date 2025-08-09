const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    console.log("token is missing");
    return res.status(400).json({ message: "maybe token is missing" });
  }
  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      res.status(400).json({ message: "maybe invalid token " });
    } else {
      req.user = decoded;
      next();
    }
  });
};

module.exports = verifyToken;
