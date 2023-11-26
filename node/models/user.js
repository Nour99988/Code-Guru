const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String },
    refreshToken: { type: String },
    exponses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exponses" }],
  },
  {
    timestamps: true,
  }
);
const User = mongoose.models.users || mongoose.model("Users", userSchema);

module.exports = User;
