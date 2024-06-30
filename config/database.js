const mongoose = require("mongoose");
const db = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      dbName: "quotes",
    });
    mongoose.set("strictQuery", false);

    console.log("database connected");
  } catch (error) {
    console.log("database connection error: ", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
