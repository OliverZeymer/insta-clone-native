import Post from "../../mongodb/models/post.js"
export default async function createPost(req, res) {
  console.log(req.file)
  const post = new Post({
    ...req.file,
    description: req.body.description,
    user: req.body.user,
  })
  try {
    await post.save()
    res.status(201).json({ message: "Post created" })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" })
    console.log(error)
    res.end()
  }
}
