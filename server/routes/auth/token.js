import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../../mongodb/models/user.js"
import dotenv from "dotenv"

dotenv.config()
export default function token(req, res) {
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
}
