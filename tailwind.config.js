/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lex-blue': '#1A3A6D',
        'lex-gold': '#D4A74B',
        'lex-blue-dark': '#0F2442',
        'lex-gold-light': '#E8C575',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

