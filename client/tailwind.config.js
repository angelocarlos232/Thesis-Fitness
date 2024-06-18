/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        defaultRed: '#cc0000',
        defaultGray: '#2b2b2b',
        defaultBlack: '#171717',
      },
    },
  },
  plugins: [],
}
