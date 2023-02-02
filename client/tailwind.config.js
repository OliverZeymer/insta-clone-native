/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors")
module.exports = {
  content: ["./views/*.js"],
  theme: {
    extend: {
      colors: {
        gray: colors.neutral,
        black: colors.black,
        white: colors.white,
        light: "#f8f8f8",
        dark: "#1a1a1a",
      },
    },
  },
  plugins: [],
}
