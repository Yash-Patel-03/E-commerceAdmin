const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hasePass = await bcrypt.hash(password, 10);
    const user = new userModel({
      email,
      password: hasePass,
    });
    await user.save();
    res.status(201).send({
      success: true,
      message: "You are successfully registered",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid password" });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.SECRETKEY);
      res.status(200).json({
        success: true,
        token: token,
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const logout = (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "You are successfully logout",
    });
  } catch (error) {}
};
module.exports = { register, login, logout };
