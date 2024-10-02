/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7fad39",
        secondary: "#dd2222",
        bgColor: "#f3f6fa",
      },
      fontFamily: {
        sans: ["Cairo", "sans-serif"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
