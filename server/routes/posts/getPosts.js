import Post from "../../mongodb/models/post.js"
export default function getPosts(req, res) {
  const { id } = req.params
  if (id) {
    Post.findById(id, (err, post) => {
      if (err) {
        return res.status(500).send(err)
      }
      if (!post) {
        return res.status(404).send({ message: "Post not found" })
      }
      return res.status(200).send(post)
    })
  } else {
    Post.find({})
      .sort({ createdAt: -1 })
      .limit(25)
      .exec((err, posts) => {
        if (err) {
          return res.status(500).send(err)
        }
        return res.status(200).send(posts)
      })
  }
}
