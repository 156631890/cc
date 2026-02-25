import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#fafafa",
        card: "#0a0a0a",
        champagne: "#C9A961",
        "champagne-light": "#D4B978",
        border: "#1a1a1a",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        display: ["var(--font-bodoni)", "Bodoni Moda", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
