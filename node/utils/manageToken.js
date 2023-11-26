// tokenUtils.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5d" });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "90d" });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

const verfRefreshToken = (refreshToken) => {
  return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
};

const becryptPassword = async (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  console.log(hash);
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
  verfRefreshToken,
};
