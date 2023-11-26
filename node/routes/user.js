const express = require("express");
const router = express.Router();
const { registerUser, login } = require("../controllers/userController");
const { addExponse, getexponses } = require("../controllers/expensesController");
const { verifyxAuth, generateNewToken } = require("../middleware/auth");

router.post("/signup", registerUser);
router.post("/login", login);

router.get("/expenses", verifyxAuth, generateNewToken, getexponses);
router.post("/expenses", verifyxAuth, generateNewToken, addExponse);

module.exports = router;
