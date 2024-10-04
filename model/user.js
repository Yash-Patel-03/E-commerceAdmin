const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: isEmail,
      message: "invalid email",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

const userModel = new mongoose.model("user", userSchema);

module.exports = userModel;
