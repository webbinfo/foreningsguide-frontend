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
      clipPath: {
        blob: `path("M94.1,282C37,399.9-26.3,530.1,11.4,624.3c36.8,93.7,175.1,150.5,316.1,167 
        c140.1,16,282.8-8.3,381.6-92.5C808.2,615.4,864,471.9,841,350S717,128.5,605.3,66.2S372.1-20.5,285.7,19.4 
        C200.2,59.8,150.5,164.3,94.1,282z")`,
      },
    },
  },
  plugins: [],
};
export default config;
