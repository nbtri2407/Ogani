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
        sans: ["Roboto", "sans-serif"],
      },
      keyframes: {
        "slide-in-right": {
          "0%": {
            visibility: "visible",
            transform: "translate3d(100%, 0, 0)",
          },
          "100%": {
            transform: "translate3d(0, 0, 0)",
          },
        },
        "slide-out-left": {
          "0%": {
            transform: "translate3d(0, 0, 0)",
          },
          "100%": {
            visibility: "hidden",
            transform: "translate3d(-100%, 0, 0)",
          },
        },
      },
      animation: {
        slideinright: "slide-in-right 1s ease-in-out 0.25s 1",
        slideoutleft: "slide-out-left 1s ease-in-out 0.25s 1",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
