const jwt = require("jsonwebtoken");
const { verifyRefreshToken, generateAccessToken, generateRefreshToken, verifyToken } = require("../utils/manageToken");
const User = require("../models/user");
require("dotenv").config();

const verifyxAuth = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const refreshtoken = req.headers.refrershtoken;

  if (!token) {
    return res.status(401).json({ error: "There is No Token" });
  }

  try {
    const userId = verifyToken(token).userId;
    req.userId = userId;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const userId = verifyRefreshToken(refreshtoken).userId;
      const prevTokenFromDB = await User.findById(userId).select("token");
      if (prevTokenFromDB == token && userId) {
        req.userId = userId;
        return next();
      }
    }
    return res.status(401).json({ error: "Token is not" });
  }
};

const generateNewToken = async (req, res, next) => {
  const userId = req.userId;
  try {
    const token = generateAccessToken(userId);
    await User.findByIdAndUpdate(userId, { token: token }, { new: true });
    req.newToken = token;
    next();
  } catch (error) {
    return res.status(401).json({ error: "failed to generate token fun generateNewToken" });
  }
};

module.exports = { verifyxAuth, generateNewToken };
