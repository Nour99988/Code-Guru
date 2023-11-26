const mongoose = require("mongoose");

const exponsesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  cost: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const exponses = mongoose.models.exponses || mongoose.model("Exponses", exponsesSchema);

module.exports = exponses;
