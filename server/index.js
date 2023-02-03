import express from "express"
import * as dotenv from "dotenv"
import connectDB from "./mongodb/connect.js"
import auth from "./routes/auth/index.js"
import posts from "./routes/posts/index.js"
import users from "./routes/users/index.js"
dotenv.config()

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: "50mb" }))

// Routes
auth(app)
posts(app)
users(app)
const startServer = async () => {
  app.listen(8080, () => {
    try {
      connectDB(process.env.MONGODB_URL)
    } catch (err) {
      console.log(err)
    }
    console.log(`Server has started on port http://localhost:8080`)
  })
}
startServer()
