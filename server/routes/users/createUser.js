import User from "../../mongodb/models/user.js"

export default function createUser(req, res) {
  const { username, password } = req.body
  const user = new User({ username, password })
  user.save((error, user) => {
    if (error) {
      return res.status(400).send({ error })
    }
    res.status(200).send({ message: "User: " + username + " created successfully" })
  })
}
