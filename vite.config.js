import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import fs from "fs";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";
export default defineConfig({
  define: {
    // __VITE_IS_HTTPS__: true,
    global: "globalThis",
    "process.env": {},
  },
  plugins: [
    laravel({
      input: "resources/js/app.jsx",
      refresh: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      stream: "stream-browserify",
      buffer: "buffer",
      process: "process/browser",
      events: "events",
      // util: "util",
    },
  },
  optimizeDeps: {
    include: ["buffer", "process", "stream-browserify", "events"],
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },

  server: {
    host: "192.168.1.107",
    port: 3000,
    // https: {
    //   key: fs.readFileSync("./ssl/192.168.1.107-key.pem"),
    //   cert: fs.readFileSync("./ssl/192.168.1.107.pem"),
    // },
    cors: {
      origin: [
        "https://192.168.1.107:3000",
        "http://192.168.1.107:3000",
        "https://192.168.1.107:8000",
        "http://192.168.1.107:8000",

        "wss://192.168.1.107:443",
        "wss://192.168.1.107:444",
        "wss://192.168.1.107:3000",
        "wss://192.168.1.107:6001",

        "https://myproject.tes:443",
        "https://myproject.test:444",
        "https://myproject.test:3000",
        "https://myproject.test:6001",

        "https://127.0.0.1:443",
        "https://127.0.0.1:444",
        "https://127.0.0.1:3000",
        "https://127.0.0.1:6001",

        "wss://127.0.0.1:443",
        "wss://127.0.0.1:444",
        "wss://127.0.0.1:6001",
        "wss://127.0.0.1:3000",

        "wss://myproject.test:443",
        "wss://myproject.test:444",
        "wss://myproject.test:3000",
        "wss://myproject.test:6001",
      ],
      credentials: true,
    },
  },
});
