import getUsers from "./getUsers.js"
import createUser from "./createUser.js"
import deleteUser from "./deleteUser.js"
import adminAuth from "../../middleware/adminAuth.js"
export default function users(app) {
  app.route("/api/v1/users/:id?").get(adminAuth(), getUsers).post(createUser).delete(adminAuth(), deleteUser)
}
