import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
  photo: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: String, required: true },
  likes: { type: Array, default: [] },
  comments: { type: Array, default: [] },
})

const Post = mongoose.model("Post", PostSchema)

export default Post
