/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Pacifico: ["Pacifico", "sans-serif"],
        Raleway: ["Raleway", "sans-serif"]
      }
    
  },
},
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}