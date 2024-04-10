const mongoose = require("mongoose");

const DbConfig = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("connected");
  } catch (e) {
    console.log(e);
  }
};
module.exports = DbConfig