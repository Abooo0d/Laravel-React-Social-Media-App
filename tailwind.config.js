import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import daisyui from "daisyui";

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
      backgroundImage: {
        "chat-pattern": "url('/images/ChatsContainer.png')",
      },

      fontFamily: {
        sans: ["Figtree", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        homeFeed: "#050b1c",
        overlayBackground: "rgba(17,17,26,0.50)",
        buttonBackColor: "rgba(201 201 201 / 0.2);",
      },
      height: {
        barHeight: "calc(100dvh - 66px)",
        messageContainer: "calc(100dvh - 100px)",
      },
      maxHeight: {
        messageContainer: "calc(100dvh - 80px)",
        homeFeed: "calc(100vh - 160px)",
        100: "100dvh",
        barHeight: "calc(100vh - 66px)",
        barContainerHeight: "calc(100vh - 170px)",
        homeFeedM_H: "calc(100vh - 100px)",
      },
      minHeight: {
        100: "100vh",
        barHeight: "calc(100dvh - 66px)",
      },
      animation: {
        scaleUp: "scale-up-hor-center 0.4s ease-in-out both",
        messageHeight: "messageHeight 0.2s ease-in-out both",
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
        messageHeight: {
          "0% ": {
            height: 0,
          },
          "100%": {
            height: "auto",
          },
        },
      },
    },
  },

  plugins: [forms, require("@tailwindcss/typography")],
};
