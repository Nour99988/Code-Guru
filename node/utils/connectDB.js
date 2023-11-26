const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("connected");
    })
    .catch((err) => {
      console.log(err);
      console.log("unconnected");
    });
};

module.exports = connectDB;
