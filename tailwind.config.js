/** @type {import('tailwindcss').Config} */
export default {
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
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
