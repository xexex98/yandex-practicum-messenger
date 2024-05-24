import autoprefixer from "autoprefixer";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      src: "/src",
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer({})],
    },
  },
});
