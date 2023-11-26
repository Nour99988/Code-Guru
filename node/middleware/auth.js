const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const refreshtoken = req.headers.refrershtoken;

  // console.log("From middleware", token);

  if (!token) {
    return res.status(401).json({ error: "There is No Token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.userId;
    console.log(decoded.userId);
    next();
  } catch (error) {
    log;
    return res.status(401).json({ error: "Token is expire" });
  }
};

module.exports = verifyToken;
