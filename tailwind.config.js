/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#ED4C67', // A vibrant pink
          coral: '#FF7979', // A warm coral
          dark: '#2d3436',
          light: '#f5f6fa',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // We will add the font link in index.html later
      }
    },
  },
  plugins: [],
}
