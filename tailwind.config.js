/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./pages/**/*.{html,js}",
    "./assets/js/**/*.js",
    "./index.html",
    "./wedding-info.html",
    "./gifting.html"
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#235673",
        "secondary": "#8CADBE",
        "tertiary": "#FA918B",
      },
      fontFamily: {
        straight: ["Faculty Glyphic", defaultTheme.fontFamily.sans],
        cursive: "Edu AU VIC WA NT Pre",
        titiweb : "Titillium Web",
      }
    },
  },
  plugins: [],
}

