import express from "express"
import * as dotenv from "dotenv"
import { v2 as cloudinary } from "cloudinary"
import Post from "../../mongodb/models/post.js"
dotenv.config()

const router = express.Router()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

router.get("/:id?", (req, res) => {
  const { id } = req.params
  if (id) {
    Post.findById(id, (err, post) => {
      if (err) {
        return res.status(500).send(err)
      }
      if (!post) {
        return res.status(404).send({ message: "Post not found" })
      }
      return res.send(post)
    })
  } else {
    Post.find({})
      .limit(10)
      .exec((err, posts) => {
        if (err) {
          return res.status(500).send(err)
        }
        return res.send(posts)
      })
  }
})

router.route("/").post(async (req, res) => {
  try {
    const { name, photo } = req.body
    const photoUrl = await cloudinary.uploader.upload(photo, { folder: "insta" })
    const newPost = await Post.create({
      name,
      photo: photoUrl.url,
    })
    res.status(201).json({
      success: true,
      data: newPost,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    })
  }
})
export default router
