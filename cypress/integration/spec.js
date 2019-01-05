/// <reference types="cypress" />
beforeEach(() => {
  cy.visit('/')
})

it('loads app', () => {
  cy.focused().should('have.class', 'new-todo')
})
