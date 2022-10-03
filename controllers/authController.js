const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const addAdmin = async (req, res) => {
  try {
    //Get Admin Details
    const { name, email, password } = req.body;

    //Check If UserName Exist
    const checkUsername = await Admin.findOne({ name });
    if (checkUsername)
      return res.json({ Error: "Username already used", status: false });

    //Check If Email Exist
    const checkEmail = await Admin.findOne({ email });
    if (checkEmail)
      return res.json({ Error: "Email already used", status: false });

    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create Model
    const admin = new Admin({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    //Send Data in DataBase
    await admin.save();

    res.status(201).send("Admin Added");
  } catch (error) {
    res.send(error);
  }
};

const login = async (req, res) => {
  try {
    //Get Login Details
    const { name, password } = req.body;

    //Find if Admin Exist in Database
    const admin = await Admin.findOne({ name });

    if (!admin)
      return res.json({ msg: "Incorrect Username or Password", status: false });

    // Check Password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });

    const token = jwt.sign({ name }, "secretKey", {
      expiresIn: "7d",
    });

    console.log(token);

    res
      .cookie("AccessToken", token, {
        httpOnly: true,
        sameSite: "None",
        secure: false,
        path: "/",
      })
      .json({ message: "Login Success" });
  } catch (error) {
    //Send Error Message
    res.send("Not authorized");
  }
};

const logOut = async (req, res) => {};

module.exports = { addAdmin, login, logOut };
