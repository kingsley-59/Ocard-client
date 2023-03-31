/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      normal: ['Inter', 'sans-serif'],
      brand: ['Montaga', 'serif']
    },
    colors: {
      'white': '#ffffff',
      'blue': '#05478A',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#d9d9d9',
      'gray-light': '#d3dce6',
    },
    extend: {},
  },
  plugins: [],
}
