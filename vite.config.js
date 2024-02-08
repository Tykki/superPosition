import { defineConfig } from "vite";

export default defineConfig({
  // So I can use hmr while on Windows fs
    server: {
      watch: {
        usePolling: true
      }
    }
  });