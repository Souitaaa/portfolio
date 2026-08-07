/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#000000",
          card: "#090909",
          inner: "#161616",
        },
        accent: {
          red: "#ff462e",
          green: "#85c207",
          blue: "#009dff",
          purple: "#7263e6",
        },
        grey: {
          50: "#f9f9f9",
          200: "#a9a9a9",
          300: "#8c8c8c",
          400: "#1a1a1a",
          500: "#101010",
        }
      },
      fontFamily: {
        clash: ['Outfit', 'Space Grotesk', 'sans-serif'],
        satoshi: ['Space Grotesk', 'Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
