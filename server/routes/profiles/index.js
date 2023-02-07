import getProfile from "./getProfile.js"
export default function profile(app) {
  app.route("/api/v1/profile").get(getProfile)
}
