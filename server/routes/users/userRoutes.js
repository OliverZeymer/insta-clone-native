import express from "express"
import * as dotenv from "dotenv"
import User from "../../mongodb/models/user.js"

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
