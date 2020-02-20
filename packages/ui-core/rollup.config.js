import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

module.exports = [
  {
    input: "./dist/cjs/ui-core.cjs.js",
    output: {
      file: "./dist/cjs/bundle.js",
      format: "iife"
    },
    plugins: [resolve(), commonjs()]
  }
];
