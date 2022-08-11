// extend Cypress "cy" global object interface with
// our custom commands defined in E2E support file
declare namespace Cypress {
  interface Chainable {
    /**
     * Enters a new todo
     * @param text string
     * @example
     *  cy.addTodo('Write more tests')
     */
    addTodo(text: string): void
  }
}
