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

/**
 * Overwritting `cypress-react-unit-test` command
 */
Cypress.Commands.add("injectReactDOM", () => {
  return cy
    .log("Injecting ReactDOM and Stencil bundle for Unit Testing")
    .then(() => {
      const scripts = Cypress.modules
        .map(module =>
          module.name.endsWith("module")
            ? `<script type="module">${module.source}</script>`
            : `<script>${module.source}</script>`
        )
        .join("");

      const html = `
        <head>
          <meta charset="utf-8">
        </head>
        <body>
          <div id="cypress-jsdom"></div>
          <x-box2 headertitle="Hello World">

      </x-box2>
          ${scripts}
        </body>
      `;

      const document = cy.state("document");
      document.write(html);
      document.close();
    });
});
