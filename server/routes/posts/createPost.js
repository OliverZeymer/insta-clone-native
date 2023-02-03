import Post from "../../mongodb/models/post.js"
import dotenv from "dotenv"
import { v2 as cloudinary } from "cloudinary"
export default async function createPost(req, res) {
  dotenv.config()
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
  try {
    const { photo, user, description } = req.body
    const photoUrl = await cloudinary.uploader.upload(photo, { folder: "insta" })
    const newPost = await Post.create({
      photo: photoUrl.url,
      user,
      description,
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
}
