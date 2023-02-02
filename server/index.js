import express from "express"
import * as dotenv from "dotenv"
import connectDB from "./mongodb/connect.js"
import token from "./routes/auth/token.js"
dotenv.config()

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: "50mb" }))

// Routes
token(app)
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
