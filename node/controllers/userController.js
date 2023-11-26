const User = require("../models/user");
const { generateAccessToken, generateRefreshToken, becryptPassword } = require("../utils/manageToken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const registerUser = async (req, res) => {
  const { name, email, password } = await req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "this Email Already is exist" });
    }

    const hashedPassword = await becryptPassword(password);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    const userId = newUser._id;
    const token = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);
    newUser.token = token;
    // newUser.refreshToken = refreshToken;
    await newUser.save();
    res.cookie("token", token);
    res.cookie("refreshToken", refreshToken);

    return res.status(201).json({ message: "sucess ", refreshToken });
  } catch (error) {
    return res.status(500).json({ error: "Wrong" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({ error: "username or password is wrong 100" });
    }

    const isValidPassword = await bcrypt.compare(password, existingUser.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: "user name or passsword is wrong" });
    }
    const token = generateAccessToken(existingUser._id);
    const refreshToken = generateRefreshToken(existingUser._id);

    existingUser.token = token;
    await existingUser.save();

    res.cookie("token", token);
    res.cookie("refreshToken", refreshToken);

    return res.status(200).json({ message: "sucss log in ", refreshToken });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ error: "server Erroreeee" });
  }
};

module.exports = { registerUser, login };
