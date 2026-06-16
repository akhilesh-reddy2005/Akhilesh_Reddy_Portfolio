/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0ea5e9",
        secondary: "#8b5cf6",
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["Space Grotesk", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      animation: {
        gradient: "gradient 3s ease infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(14, 165, 233, 0.5)",
      },
    },
  },
  plugins: [],
}
