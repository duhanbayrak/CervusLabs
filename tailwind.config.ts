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
        primary: "#111827", // Deep charcoal/black as primary anchor
        "background-light": "#EFF1F4", // Light gray for light mode
        "background-dark": "#0B0F15", // Deep charcoal almost black for dark mode
        "card-light": "rgba(255, 255, 255, 0.7)",
        "card-dark": "rgba(30, 41, 59, 0.4)",
      },
      fontFamily: {
        display: ["var(--font-manrope)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.25em",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
        float: "float 6s ease-in-out infinite",
        "network-pulse": "networkPulse 4s ease-in-out infinite",
        draw: "draw 3s ease-out forwards",
        "grow-height": "growHeight 1.5s ease-out forwards",
        "slide-right": "slideRight 1.5s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        networkPulse: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
        draw: {
          from: { strokeDashoffset: "1000" },
          to: { strokeDashoffset: "0" },
        },
        growHeight: {
          from: { height: "0%" },
          to: { height: "var(--target-height)" },
        },
        slideRight: {
          from: { width: "0%" },
          to: { width: "var(--target-width)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
