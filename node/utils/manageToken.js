// tokenUtils.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "90d" });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

const verifyRefreshToken = (refreshToken) => {
  return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
};

const becryptPassword = async (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const comparePassword = async (password) => {
  bcrypt.compare(password, hash, function (err, result) {
    return result;
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  becryptPassword,
  comparePassword,
  verifyToken,
  verifyRefreshToken,
};
