import express from "express";
import * as dotenv from "dotenv";
import User from "../mongodb/models/user.js";

dotenv.config();

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
});
router.post("/login", (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      return res.status(500).send();
    }
    if (!user) {
      return res.status(404).send();
    }
    if (user.password !== req.body.password) {
      return res.status(401).send();
    }
    res.send(user);
  });
});
