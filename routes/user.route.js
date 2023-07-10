const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const { userModel } = require("../model/user.model");
require("dotenv").config();
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, password, address } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hash, address });
    await user.save();
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.sendStatus(401);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.sendStatus(401);
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).send({ token });
  } catch (error) {
    res.sendStatus(error.message);
  }
});

userRouter.put("/user/:id/reset", async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.sendStatus(404);
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.sendStatus(401);
    }
    const hash = await bcrypt.hash(newPassword, 10);
    user.password = hash;
    await user.save();
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = {
  userRouter,
};
