import autoprefixer from "autoprefixer";
import { defineConfig } from "vite";

import handlebars from "./src/init/vite-plugin-handlebars-precompile";

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
  plugins: [handlebars()],
});
