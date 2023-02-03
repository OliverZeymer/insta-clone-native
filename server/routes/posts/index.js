import getPosts from "./getPosts.js"
import createPost from "./createPost.js"
import deletePost from "./deletePost.js"
import userAuth from "../../middleware/userAuth.js"
export default function auth(app) {
  app.route("/api/v1/posts/:id?").get(getPosts).post(userAuth(), createPost).delete(userAuth(), deletePost)
}
