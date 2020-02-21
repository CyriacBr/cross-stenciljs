declare namespace Cypress {
  interface Chainable<Subject> {
    ensureCustomElements: () => Chainable<void>;
  }
}
