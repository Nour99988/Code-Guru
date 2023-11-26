// const Exponses = require("../models/expense");
const exponses = require("../models/expense");
const User = require("../models/user");
const { verifyToken } = require("../utils/manageToken");

const addExponse = async (req, res) => {
  const { title, cost } = req.body;

  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "المستخدم غير موجود" });
    }

    const newExpense = new exponses({ userId, title, cost });
    await newExpense.save();

    user.exponses.push(newExpense);
    await user.save();
    return res.status(201).json({ message: "تمت إضافة المصروف بنجاح" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "happed wrong when add exponse fun addExponse" });
  }
};
const getexponses = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate("exponses");
    const userExpenses = user.exponses.map((expense) => {
      return {
        title: expense.title,
        cost: expense.cost,
        date: expense.date,
      };
    });
    res.cookie("token", req.newToken);
    return res.status(200).json({ message: userExpenses });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
module.exports = { addExponse, getexponses };
