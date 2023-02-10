import getPosts from "./getPosts.js"
import createPost from "./createPost.js"
import deletePost from "./deletePost.js"
import userAuth from "../../middleware/userAuth.js"
import upload from "../../middleware/upload.js"
export default function auth(app) {
  app.route("/api/v1/posts/:id?").get(getPosts).post(userAuth(), upload.single("file"), createPost).delete(userAuth(), deletePost)
}
