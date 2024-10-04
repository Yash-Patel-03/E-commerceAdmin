const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect(`mongodb://localhost:27017/${process.env.DB}`)
    .then(() => {
      console.log(`Database connected successfully to ${process.env.DB}`);
    })
    .catch((err) => {
      console.log("Database connection error:", err);
    });
};

module.exports = connect;
