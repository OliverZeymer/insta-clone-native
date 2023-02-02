import express from "express"
import * as dotenv from "dotenv"
import User from "../../mongodb/models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

dotenv.config()

const router = express.Router()

router.route("/users").get(async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).json({
      success: true,
      data: users,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    })
  }
})
router.post("/login", (req, res) => {
  const { username, password } = req.body

  User.findOne({ username }, (error, user) => {
    if (error) {
      return res.status(400).send({ error })
    }
    if (!user) {
      return res.status(404).send({ error: "User not found" })
    }
    bcrypt.compare(password, user.password, (error, result) => {
      if (error) {
        return res.status(400).send({ error })
      }
      if (!result) {
        return res.status(401).send({ error: "Incorrect password" })
      }
      const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET)
      res.send({ message: "Logged in successfully", token })
    })
  })
})

router.post("/signup", (req, res) => {
  const { username, password } = req.body

  const user = new User({ username, password })
  user.save((error, user) => {
    if (error) {
      return res.status(400).send({ error })
    }
    res.send({ message: "User " + username + " created successfully" })
  })
})

export default router
