import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
    "./storage/framework/views/*.php",
    "./resources/views/**/*.blade.php",
    "./resources/js/**/*.jsx",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Figtree", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        homeFeed: "#050b1c",
        overlayBackground: "rgba(17,17,26,0.50)",
      },
      maxHeight: {
        homeFeed: "calc(100vh - 95px)",
        100: "100vh",
      },
      minHeight: {
        100: "100vh",
      },
      animation: {
        scaleUp: "scale-up-hor-center 0.4s ease-in-out both",
      },
      keyframes: {
        "scale-up-hor-center": {
          "0% ": {
            transform: "scaleX(0.4);",
          },
          "100%": {
            transform: "scaleX(1)",
          },
        },
      },
    },
  },

  plugins: [forms],
};
