/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        background:{
          dark:"#1B1B1B"
        },
        customeGray:{
          DEFAULT:"#1F1F1F"
        }
      }
    },
  },
  plugins: [],
}