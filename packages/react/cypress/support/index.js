// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "cypress-react-unit-test";
import "./commands";

/// <reference types="cypress" />
/* eslint-disable */
/**
 * Inspired from cypress-react-unit-test to inject web components bundle
 * into the testing document.
 * Cypress.modules array is later used inside the cy.injectReactDOM()
 * which is called on cy.mount()
 */
before(() => {
  const moduleNames = [
    {
      name: "ui-core",
      type: "file",
      location: "../ui-core/dist/ui-core/ui-core.js"
    },
    // {
    //   name: "ui-core-module",
    //   type: "file",
    //   location: "../ui-core/dist/custom-elements-bundle/index.mjs"
    // },
    // {
    //   name: "ui-core",
    //   type: "file",
    //   location: "../ui-core/dist/cjs/bundle.js"
    // },
    // {
    //   name: "ui-core-svelte",
    //   type: "file",
    //   location: "../ui-core-svelte/public/bundle.js"
    // },
  ];
  cy.log("Adding web components bundle to UMD module cache").then(() => {
    for (const module of moduleNames) {
      let { name, type, location } = module;
      cy.readFile(location, { log: false }).then(source =>
        Cypress.modules.push({ name, type, location, source })
      );
    }
  });
});
