import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
  originalname: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  filename: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: String, required: true },
  likes: { type: Array, default: [] },
  comments: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now },
})

const Post = mongoose.model("Post", PostSchema)

export default Post
