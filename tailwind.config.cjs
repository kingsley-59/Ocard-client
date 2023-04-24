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
      'blue-dark': '#022241',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'black': '#273444',
      'gray-dark': '#8f8f80',
      'gray': '#d9d9d9',
      'gray-light': '#d3dce6',
    },
    extend: {},
  },
  plugins: [],
}
