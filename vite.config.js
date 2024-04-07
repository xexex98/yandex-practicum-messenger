/** @type {import('vite').UserConfig} */
import { defineConfig } from "vite";
import handlebars from "./src/init/vite-plugin-handlebars-precompile";
import autoprefixer from "autoprefixer";

export default defineConfig({
  css: {
    postcss: {
      plugins: [autoprefixer({})],
    },
  },
  plugins: [handlebars()],
});
