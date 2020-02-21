import replace from "@rollup/plugin-replace";

module.exports = [
  /**
   * Bundle Stencil's custom-elements-bundle as IIFE so we
   * can access the generated custom elements and define them
   */
  {
    input: "./dist/custom-elements-bundle/index.mjs",
    output: {
      file: "./dist/custom-elements-bundle/bundle.js",
      format: "iife",
      name: "_WCBundle",
      footer: `
function dasherize(str) {
  return str.replace(/[A-Z]/g, function(char, index) {
    return (index !== 0 ? '-' : '') + char.toLowerCase();
  });
}
for (const [key, value] of Object.entries(window._WCBundle)) {
  if (value.name === "HTMLElement") {
    const name = dasherize(key);
    window.addEventListener('load', () => {
      setTimeout(() => {
        window.document.querySelector(name).style.visibility = 'visible';
      }, 100);
    });
    window.customElements.define(name, value);
  }
}
      `
    },
    plugins: [
      replace({
        "var _WCBundle": "window._WCBundle"
      })
    ]
  }
];
