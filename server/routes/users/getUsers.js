import User from "../../mongodb/models/user.js"
export default function getUsers(req, res) {
  const { id } = req.params
  if (id) {
    User.findById(id, (err, user) => {
      if (err) {
        return res.status(500).send(err)
      }
      if (!user) {
        return res.status(404).send({ message: "user not found" })
      }
      return res.send(user)
    })
  } else {
    User.find({})
      .limit(25)
      .exec((err, users) => {
        if (err) {
          return res.status(500).send(err)
        }
        return res.send(users)
      })
  }
}
