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

// https://github.com/bahmutov/cy-spok
// @ts-ignore
require('@bahmutov/cy-grep')()

// @ts-ignore
require('cypress-watch-and-reload/support')

// define a simple custom command to add a todo via UI
Cypress.Commands.add('addTodo', (text: string) => {
  cy.get('.new-todo').type(text + '{enter}')
  // check when the new todo appears in the list
  cy.contains('.todo-list li', text)
})
