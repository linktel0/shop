//const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src1/**/*.{js,jsx,ts,tsx}',
    './screen/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './screen/**/*.html',
    './screen/**/*.{js,jsx,ts,tsx}',
    './public/**/*.html',
    './public/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    colors: {
       primary: {
          light: "#fafafafa",
          DEFAULT: "#DB3022",
          dark: "#475569",
        },
        secondary: {
          light: "#fde68a",
          DEFAULT: "#d400bc",
          dark: "#92400e",
        },
    },
    extend: {
      colors: {
        error: "#DB3022",
        red: {
          DEFAULT: "#DB3022",
          darker: '#bf1c0a',
          lighter: '#f75546', 
        },
        gray: {
          DEFAULT: "#9B9B9B",
          darker: "#c4c4c4c4",
          lighter: "#fafafafa",
        },
      },
    },
  },
  plugins: [
    function({ addComponents }) {
      const buttons = {
        '.btn': {
          backgroundColor: '#fff',
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600',
        },
        '.btn-primary': {
          backgroundColor: '#4299e1',
          fontWeight: '600',
        },
        '.btn-secondary': {
          backgroundColor: '#667eea',
          fontWeight: '100',
        },
      }

      const texts = {
        '.text': {
          backgroundColor: '#fff',
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600',
        },
        '.text-h': {
          backgroundColor: '#4299e1',
          fontWeight: '600',
        },
        '.text-h-1': {
          backgroundColor: '#667eea',
          fontWeight: '100',
        },
        '.description': {
          fontFamily: "Ubuntu-Regular",
          fontSize: 14,
          lineHeight: 20,
          color: "black",
          opacity: 0.8
        },
        '.body2': {
          fontFamily: "Ubuntu-Medium",
          fontSize: 16,
          color: "black"
        },
      }

      addComponents(buttons)
      addComponents(texts)
    }
  ],
}
