const express = require("express");
const router = express.Router();
const { registerUser, login } = require("../controllers/userController");
const { addExponse, getexponses } = require("../controllers/expensesController");
const verifyToken = require("../middleware/auth");
const { generateAccessToken } = require("../utils/manageToken");

router.post("/signup", registerUser);
router.post("/login", login);

router.get("/expenses", verifyToken, getexponses);
router.post("/expenses", verifyToken, addExponse);

module.exports = router;
