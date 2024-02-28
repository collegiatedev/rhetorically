import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "cc-black": "#121212",
        "cc-blue-dark": "#0A1931",
        "cc-blue-light": "#9FBFEB",
        "cc-blue": "#122C59",
        "cc-blue-highlight": "#185ADB",
        "cc-white": "#F2F2F2",
        "cc-yellow": "#FFC947",
        "cc-orange": "#D9882B",
      },
    },
  },
  plugins: [],
} satisfies Config;
