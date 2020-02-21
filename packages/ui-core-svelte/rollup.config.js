import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import autoPreprocess from 'svelte-preprocess';
import typescript from "rollup-plugin-typescript2"
import typescriptCompiler from "typescript"

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/index.ts",
  output: {
    sourcemap: !production,
    format: "iife",
    name: "app",
    file: "public/bundle.js"
  },
  plugins: [
    svelte({
      dev: !production,
      extensions: [".svelte"],
      customElement: true,
      preprocess: autoPreprocess({ /* options */ })
    }),
    typescript({ typescript: typescriptCompiler }),
    commonjs({ include: "node_modules/**" }),
    resolve(),

    // Enable live reloading in development mode
    !production && livereload("public"),

    // Minify the production build (npm run build)
    production && terser()
  ]
};
