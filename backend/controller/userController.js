const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const orderModel = require("../models/order");

const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({ message: "please enter all the details" });
  }
  const existingUser = await userModel.findOne({ email: email });
  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "user doesnot exist. please signup" });
  }
  const isCorrectPwd = await bcrypt.compare(password, existingUser.password);
  if (!isCorrectPwd) {
    return res.status(401).json({ message: "unauthorized user" });
  }
  const loginToken = jwt.sign(
    {
      _id: existingUser._id,
      fullName: existingUser.fullName,
      email: existingUser.email,
      role: existingUser.role,
    },
    process.env.LOGIN_SECRET_TOKEN,
    { expiresIn: "1h" }
  );

  const userData = {
    _id: existingUser._id,
    name: existingUser.fullName,
    email: existingUser.email,
    role: existingUser.role,
    address: existingUser.address,
  };
  return res
    .status(200)
    .cookie("Authorization", loginToken)
    .json({ message: "login successful", user: userData });
};
const signupController = async (req, res) => {
  const { email, password, fullName, role, address } = req.body;
  const [{ houseName, locality, city, state, country, pincode }] = address;
  if (
    !email ||
    !password ||
    !fullName ||
    // !role ||
    !address ||
    !Array.isArray(address) ||
    !houseName ||
    !locality ||
    !city ||
    !state ||
    !country ||
    !pincode
  ) {
    return res.status(400).json({ message: "all field are required" });
  }

  const existingUser = await userModel.findOne({ email: email });
  if (existingUser) {
    return res.status(409).json({ message: "user already exist" });
  }
  const hashedPwd = await bcrypt.hash(password, 10);
  const newUser = await userModel.create({
    email: email,
    password: hashedPwd,
    fullName: fullName,
    role: role || "user",
    address: [
      {
        houseName: houseName,
        locality: locality,
        city: city,
        state: state,
        country: country,
        pincode: pincode,
      },
    ],
  });
  if (!newUser) {
    return res.status(500).json({
      message: "error! user cannot be created. please try again",
    });
  }
  const loginToken = jwt.sign(
    {
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      role: newUser.role,
    },
    process.env.LOGIN_SECRET_TOKEN,
    { expiresIn: "1h" }
  );
  return res
    .status(200)
    .cookie("Authorization", loginToken)
    .json({ message: "sign up successful" });
};

module.exports = { loginController, signupController };
