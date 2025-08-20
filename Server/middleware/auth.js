const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  let token = req.cookies["nomado-token"];

  if (!token) {
    console.log("token is missing");
    // return res.status(400).json({ message: "maybe token is missing" });
    //  res.status(400).json({ message: "maybe token is missing" });
    req.token = false
     next()
  }else{
    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      res.status(400).json({ message: "maybe invalid token " });
    } else {
       req.token = true
      req.user = decoded;
      next();
    }
  });
  }
  
};

module.exports = verifyToken;
