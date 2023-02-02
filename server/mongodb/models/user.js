import mongoose from "mongoose"
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
})

userSchema.pre("save", function (next) {
  const user = this
  bcrypt.hash(user.password, 10, (error, hash) => {
    if (error) {
      return next(error)
    }
    user.password = hash
    next()
  })
})

const User = mongoose.model("User", userSchema)

export default User
