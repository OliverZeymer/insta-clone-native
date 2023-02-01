import mongoose from "mongoose";

const User = new mongoose.Schema({
  username: { type: String, required: true },
  password: String,
});

const UserSchema = mongoose.model("User", User);

export default UserSchema;
