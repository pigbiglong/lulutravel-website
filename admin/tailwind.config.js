/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: '#1a3a2f',
        bamboo: '#4A7C59',
        wood: '#C4A77D',
        cream: '#F5F2EB',
      }
    },
  },
  plugins: [],
}
