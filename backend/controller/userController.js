const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginController = () => {};
const signupController = async (req,res) => {
  const { email, password, fullName, role, address } = req.body;
  const [{ houseName, locality, city, state, country, pincode }] = address;
  if (
    !email ||
    !password ||
    !fullName ||
    !role ||
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
    role: role,
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
    return res
      .status(500)
      .json({ message: "error! user cannot be created. please try again" });
  }
  const loginToken = jwt.sign(
    {
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
    },
    process.env.LOGIN_SECRET_TOKEN,
    { expiresIn: "10m" }
  );
  return res
    .status(200)
    .cookie("Authorization", loginToken)
    .json({ message: "sign up successful" });
};

module.exports = { loginController, signupController };
