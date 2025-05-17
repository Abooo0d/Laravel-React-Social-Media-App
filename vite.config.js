import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import fs from "fs";
export default defineConfig({
  // define: {
  //   __VITE_IS_HTTPS__: true,
  // },
  plugins: [
    laravel({
      input: "resources/js/app.jsx",
      refresh: true,
    }),
    react(),
  ],
  server: {
    host: "192.168.1.107",
    port: 3000,
    // https: {
    //   key: fs.readFileSync("./127.0.0.1+2-key.pem"),
    //   cert: fs.readFileSync("./127.0.0.1+2.pem"),
    // },
    cors: {
      // origin: "https://myproject.test:444",
      // origin: "https://192.168.1.107:444",
      origin: "http://192.168.1.107:8000",
      // origin: "http://192.168.1.107:8000/chats",
      credentials: false,
    },
  },
});
