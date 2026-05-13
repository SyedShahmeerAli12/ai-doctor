import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        dt: {
          red: "#ed1c24",
          dark: "#0e0e0e",
        },
        danger: "#dc2626",
      },
      keyframes: {
        fade_in: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slide_up: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        fade_in: "fade_in 0.3s ease-in",
        slide_up: "slide_up 0.4s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
