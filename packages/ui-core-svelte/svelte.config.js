const sveltePreprocess = require("svelte-preprocess");

module.exports = {
  customElement: true,
  preprocess: sveltePreprocess({
    // ...svelte-preprocess options
  })
  // ...other svelte options
};
