/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors")
module.exports = {
  content: ["./**/*.js"],
  theme: {
    extend: {
      colors: {
        gray: colors.neutral,
        black: colors.black,
        white: colors.white,
      },
    },
  },
  plugins: [],
}
