import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#d4af37",
          50: "#f9f5e8",
          100: "#f0ebd2",
          200: "#e2d6a6",
          300: "#d4c279",
          400: "#d4af37",
          500: "#c9a227",
          600: "#a8821f",
          700: "#876217",
          800: "#664110",
          900: "#452009",
        },
        secondary: {
          DEFAULT: "#1a1a1a",
          50: "#e8e8e8",
          100: "#d1d1d1",
          200: "#a3a3a3",
          300: "#757575",
          400: "#474747",
          500: "#1a1a1a",
          600: "#151515",
          700: "#101010",
          800: "#0a0a0a",
          900: "#050505",
        },
        background: "#0a0a0a",
        surface: "#141414",
        text: {
          DEFAULT: "#ffffff",
          muted: "#888888",
        },
        accent: "#c9a227",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
