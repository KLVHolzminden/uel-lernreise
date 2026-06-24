import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#112033",
        slate: "#5E6A78",
        mist: "#E8EEF4",
        sky: "#CFE7F7",
        pine: "#1D5B4F",
        moss: "#6D9F71",
        sand: "#F6F2E8",
        ember: "#C96B39"
      },
      boxShadow: {
        soft: "0 20px 60px rgba(17, 32, 51, 0.10)",
        card: "0 16px 40px rgba(17, 32, 51, 0.08)"
      },
      borderRadius: {
        "4xl": "2rem"
      },
      fontFamily: {
        sans: ['"Segoe UI Variable"', '"Aptos"', '"Segoe UI"', "sans-serif"],
        display: ['"Iowan Old Style"', '"Palatino Linotype"', "serif"]
      },
      backgroundImage: {
        glow: "radial-gradient(circle at top left, rgba(207, 231, 247, 0.85), transparent 40%), radial-gradient(circle at right, rgba(109, 159, 113, 0.18), transparent 28%)"
      }
    }
  },
  plugins: []
};

export default config;
