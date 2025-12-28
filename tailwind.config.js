/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          primary: '#e11d48',
          secondary: '#d946ef',
          accent: '#c026d3',
        },
        purple: {
          primary: '#a855f7',
          secondary: '#9333ea',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-pink': '0 0 20px rgba(225, 29, 72, 0.5)',
        'glow-pink-lg': '0 0 30px rgba(225, 29, 72, 0.7)',
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(to bottom, #0f172a, #1e1b4b)',
      },
    },
  },
  plugins: [],
}

