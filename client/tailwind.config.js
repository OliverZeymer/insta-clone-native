/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./views/*.js"],
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
};
