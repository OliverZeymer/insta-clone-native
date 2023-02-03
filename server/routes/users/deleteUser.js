import User from "../../mongodb/models/user.js"

export default function deleteUser(req, res) {
  const { id } = req.params
  User.findByIdAndDelete(id, (error, user) => {
    if (error) {
      return res.status(500).send({ error })
    }
    if (!user) {
      return res.status(404).send({ error: "User not found" })
    }
    res.status(200).send({ message: "User deleted successfully" })
  })
}
