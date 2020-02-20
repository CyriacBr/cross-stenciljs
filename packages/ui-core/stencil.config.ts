import { Config } from "@stencil/core";
import { reactOutputTarget } from "@stencil/react-output-target";

export const config: Config = {
  namespace: "ui-core",
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: "@test/ui-core",
      proxiesFile: "../react/src/lib/src/stencil/components.ts"
    }),
    {
      type: "dist",
      esmLoaderPath: "../loader"
    },
    {
      type: "dist-hydrate-script",
      dir: "dist/hydrate"
    },
    {
      type: "dist-custom-elements-bundle"
    },
    {
      type: "docs-readme"
    }
  ]
};
