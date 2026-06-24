/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Outfit_400Regular', 'sans-serif'], // Outfit used as primary header font
        sans: ['Inter_400Regular', 'sans-serif'], // Inter used as secondary/body font
      },
      colors: {
        dark: {
          bg: '#0a0a0a',
          surface: '#171717',
          surfaceAlt: '#262626',
        },
        gold: {
          light: '#fde047',
          DEFAULT: '#d4af37',
          dark: '#a16207',
        }
      }
    },
  },
  plugins: [],
};
