import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export default function authorization(request, response, next) {
  if (!request.headers.authorization) {
    response.status(401)
    response.end()
    return
  }

  // check format fx "Bearer fa98ep9p498pv9np4t"
  const header = request.headers.authorization.split(" ")
  if (header.length !== 2 && header[0].toLowerCase() !== "bearer") {
    response.status(403)
    response.end()
    return
  }

  // check if valid token
  try {
    jwt.verify(header[1], process.env.TOKEN_SECRET)
    next()
  } catch (error) {
    response.status(403)
    response.end()
    return
  }
}
