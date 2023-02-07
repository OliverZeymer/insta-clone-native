import jwt from "jsonwebtoken"
import User from "../../mongodb/models/user.js"
export default function getProfile(req, res) {
  const token = req.headers["authorization"].split(" ")[1]
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    User.findById(decoded.userId)
      .select("-password")
      .select("-__v")
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json({ msg: "Token is not valid" }))
  } catch (error) {
    console.error(error)
    res.status(400).json({ msg: "Token is not valid" })
  }
}
