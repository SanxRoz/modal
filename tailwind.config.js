/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "sf-mono": ['"sf-mono"', "monospace"],
        Inter: ['"Inter"', "sans-serif"],
        Emoji: ['"Noto Color Emoji"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
