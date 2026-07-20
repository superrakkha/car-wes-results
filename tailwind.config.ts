import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#0AA33B",
          "green-dark": "#087F30",
          red: "#EF3E3E",
          yellow: "#FFD928",
          bg: "#F7F8FA",
          text: "#222222",
        },
      },
      fontFamily: {
        sans: [
          "'Noto Sans JP'",
          "'Hiragino Sans'",
          "'Yu Gothic'",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 2px 10px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 8px 20px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
