import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'footer-gradient-coral': 'linear-gradient(90deg, #ED6C62 0%, #161D49 100%)',
        'footer-gradient-black': 'linear-gradient(180deg, rgba(0, 0, 0, 0.3019607843) 0%, #000000 56%, #000000 100%)',
      },
      colors: {
        blue: {
          DEFAULT: '#1b204a',
          dark: '#161a3f',
        },
        yellow: {
          DEFAULT: '#ffd832',
          dark: '#e6c82e',
        },
        coral: {
          DEFAULT: '#ed6c62',
          dark: '#e15b51',
        },
        mint: {
          DEFAULT: '#baded7',
          dark: '#a7d5c9',
        },
        chalk: {
          DEFAULT: '#dcdcdc',
          dark: '#c9c9c9',
        },
      },
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
      },
      keyframes: {
        'border-slide': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        'border-slide': 'border-slide 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;
