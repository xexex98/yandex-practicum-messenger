/** @type {import('vite').UserConfig} */
import autoprefixer from "autoprefixer";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import handlebars from "./src/init/vite-plugin-handlebars-precompile";

export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer({})],
    },
  },
  plugins: [handlebars()],
});
