import Post from "../../mongodb/models/post.js"
import fs from "fs"

export default async function deletePost(req, res) {
  const { id } = req.params
  try {
    const post = await Post.findById(id)

    // Delete the image from the server's file system
    fs.unlinkSync(`uploads/${post.filename}`)

    // Remove the post from the database
    await post.remove()

    res.json({ message: "Post and associated image deleted" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error deleting post" })
  }
}
