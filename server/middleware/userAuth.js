import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export default function userAuth() {
  return async (req, res, next) => {
    if (!req.headers.authorization) {
      res.status(401).send({ error: "Unauthorized: Provide a user token" })
      res.end()
      return
    }

    // check format fx "Bearer fa98ep9p498pv9np4t"
    const header = req.headers.authorization.split(" ")
    if (header.length !== 2 && header[0].toLowerCase() !== "bearer") {
      res.status(403)
      res.end()
      return
    }

    // check if valid token
    try {
      jwt.verify(header[1], process.env.TOKEN_SECRET)
      next()
    } catch (error) {
      res.status(403)
      res.end()
      return
    }
  }
}
