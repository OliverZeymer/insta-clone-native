import Post from "../../mongodb/models/post.js"
export default function deletePost(req, res) {
  const { id } = req.params
  Post.findByIdAndDelete(id, (error, post) => {
    if (error) {
      return res.status(500).send({ error })
    }
    if (!post) {
      return res.status(404).send({ error: "post not found" })
    }
    res.status(200).send({ message: "Post deleted successfully" })
  })
}
