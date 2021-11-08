const jwt = require("jsonwebtoken");

const generateToken = (tokenData) => {
    const token = jwt.sign({
      data: tokenData
    }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
    return token;
  };
  
  
  const verifyToken = (req, res, next) => {
    const Header = req.headers["authorization"];
    const token = Header && Header.split(" ")[1];
  
    if (token === null || token === undefined) {
      return res.sendStatus(401)
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
  
        res.status(403).json({
          message: "Invalid Token"
        })
      } else {
        req.user = user;
        next();
      }
    })
  };

  module.exports = {
    generateToken,
    verifyToken
  }