const express = require("express");
const router = express.Router();
const user = require("../Models/Users");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const findUser = await user.findOne({ username, password });

    if (!findUser) {
      res.status(404).json({ message: "Invalid username or password" });
    } else {
      const token = jwt.sign(findUser.toJSON(), process.env.Secret_key);
      res.json({
        message: `${username} logged in successfully`,
        username,
        token,
      });
    }
  } catch (err) {
    console.log(err);
    res.json("Something went wrong");
  }
});
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username);
    const existingUser = await user.findOne({ username });
    console.log(existingUser);
    if (!existingUser) {
      const addUser = await user.create({ username, password });
      const token = jwt.sign(addUser.toJSON(), process.env.Secret_key);
      res.json({
        message: `${username} registered successfully`,
        username,
        token,
      });
    }
    res.json({ message: "User already exists kindly login" });
  } catch (err) {
    res.json("Something went wrong , couldnt register");
  }
});

module.exports = router;
