/** @type {import('vite').UserConfig} */
import { defineConfig } from 'vite';
import handlebars from './src/init/vite-plugin-handlebars-precompile';

export default defineConfig({
  root: '.',
  plugins: [handlebars()],
});
