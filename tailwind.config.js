/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': "#17192D",
        'blue-500': "#2188FF",
        'blue-900': "#023B78",
      },
      borderRadius: {
        'xs': '2px'
      }
    },
  },
  plugins: [],
}
