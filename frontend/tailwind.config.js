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
          50: '#f4f6fc',
          100: '#e9edfa',
          200: '#c7d2f4',
          300: '#a5b8ee',
          400: '#6283e1',
          500: '#1f4ed4', // Primary Indigo/Blue
          600: '#1c46bf',
          700: '#173aaa',
          800: '#122e88',
          900: '#0e256f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
