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
    host: "192.168.61.10",
    port: 3000,
    // https: {
    //   key: fs.readFileSync("./ssl/192.168.1.109+1-key.pem"),
    //   cert: fs.readFileSync("./ssl/192.168.1.109+1.pem"),
    // },
    cors: {
      origin: [
        // "http://192.168.1.104:8000",
        // "http://192.168.1.104:3000",
        // "http://192.168.1.104:6001",

        "http://192.168.61.10:8000",
        "http://192.168.61.10:3000",
        "http://192.168.61.10:6001",

        // "http://192.168.1.109:8000",
        // "http://192.168.1.109:3000",
        // "http://192.168.1.109:6001",

        // "http://192.168.61.10:8000",
        // "http://192.168.61.10:3000",
        // "http://192.168.61.10:6001",
      ],
      credentials: true,
    },
  },
});
