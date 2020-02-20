// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const loader = require("@test/ui-core/loader");
/// <reference types="cypress" />
/* eslint-disable */
/**
 * Adding a command to register web components
 */
Cypress.Commands.add("defineCustomElements", () => {
  return cy
    .log("Defining custom elements")
    .window()
    .then(async win => {
      await loader.applyPolyfills();
      await loader.defineCustomElements(win);
    });
});
